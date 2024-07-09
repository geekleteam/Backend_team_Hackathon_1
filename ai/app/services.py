# app/services.py

import logging
from langchain_core.prompts import ChatPromptTemplate, PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_openai import ChatOpenAI
from langchain_core.runnables import Runnable
from fastapi import HTTPException
from app.config import Config
from app.models import TechnologyComparison
from langchain.utils.openai_functions import convert_pydantic_to_openai_function

logger = logging.getLogger("app.server")

frontend_template = PromptTemplate(
    input_variables=["technologies", "relevant_parameters", "output_format"],
    template="""
    Compare the following technologies based on the relevant parameters provided. Ensure the comparison is presented in the specified output format.

    Technologies: {technologies}
    Relevant Parameters: {relevant_parameters}
    Output Format: {output_format}

    Provide a detailed comparison and recommendation for each technology separately in a structured JSON format.
    """
) + "\n Limit each parameter's response to 4-5 words."

openai_functions = [convert_pydantic_to_openai_function(TechnologyComparison)]

class CompareTechnologiesRunnable(Runnable):
    async def invoke(self, input_data):
        try:
            technologies = input_data.get("technologies", [])
            relevant_parameters = input_data.get("relevant_parameters", [])
            output_format = input_data.get("output_format", "JSON")

            if len(technologies) > 10:
                raise HTTPException(status_code=400, detail="Maximum limit of 10 technologies exceeded")

            logger.info("Received request for comparison")
            logger.info(f"Technologies: {technologies}")
            logger.info(f"Relevant Parameters: {relevant_parameters}")
            logger.info(f"Output Format: {output_format}")

            api_key = Config.OPENAI_API_KEY
            if not api_key:
                raise ValueError("OpenAI API key not found")

            model = ChatOpenAI(api_key=api_key)
            
            # Determine default relevant parameters based on technology types
            if not relevant_parameters:
                if all(tech in ["aws", "GCP", "azure", "Digital Ocean"] for tech in technologies):
                    relevant_parameters = ["Scalability", "Serverless", "Performance", "Community Support"]
                elif all(tech in ["React", "Vue", "Angular"] for tech in technologies):
                    relevant_parameters = ["VirtualDOM", "RenderingPattern", "ComponentBased", "LearningCurve"]
                else:
                    relevant_parameters = ["Performance", "Community Support", "LearningCurve", "DevelopedBy"]

            technologies_str = ', '.join(technologies)
            relevant_parameters_str = ', '.join(relevant_parameters)
            prompt = frontend_template.format(
                technologies=technologies_str,
                relevant_parameters=relevant_parameters_str,
                output_format=output_format
            )
            
            logger.info("Generated prompt")
            logger.info(prompt)

            parser = JsonOutputParser()
            chain = ChatPromptTemplate.from_template(prompt) | model | parser

            logger.info("Invoking the chain")
            response = chain.invoke({})
            
            logger.info("Chain invoked successfully")
            logger.info(f"Response: {response}")

            # Adjust the response to include the technology name within each techN object
            formatted_response = [
                {
                    f"tech{i+1}": {"name": tech_name, **details}
                    for i, (tech_name, details) in enumerate(response.items())
                }
            ]

            return formatted_response
            
        except Exception as e:
            logger.error(f"Error during request processing: {str(e)}")
            raise HTTPException(status_code=500, detail=str(e))
