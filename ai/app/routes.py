from fastapi import APIRouter, HTTPException, Request
from app.models import ComparisonRequest, ComparisonResponse, TechnologyComparison
from app.config import Config
from typing import List, Dict
import json
import os
from langchain_openai import ChatOpenAI
import logging

# Load the JSON files
base_dir = os.path.dirname(os.path.dirname(__file__))
with open(os.path.join(base_dir, 'data', 'tech_list.json')) as f:
    tech_list = json.load(f)

with open(os.path.join(base_dir, 'data', 'tech_domains_and_parameters.json')) as f:
    tech_domains_and_parameters = json.load(f)

router = APIRouter()

def get_technology_category(technology: str) -> str:
    technology_lower = technology.lower()
    for category, details in tech_list.items():
        for techs in details.values():
            if any(technology_lower == tech.lower() for tech in techs):
                return category
    return None

def get_relevant_parameters(category: str) -> List[str]:
    return tech_domains_and_parameters.get(category, [])

def fetch_technology_data_from_openai(tech_name, parameters, api_key):
    model = ChatOpenAI(api_key=api_key)
    
    example_response = {
        "technologies": [
            {
                "tech_name": "AWS",
                "attributes": {
                    "Scalability": "Highly scalable",
                    "Serverless Options": "AWS Lambda",
                    "Performance": "Optimized",
                    "Community Support": "Extensive",
                    "Security": "Strong security",
                    "Cost Efficiency": "Cost-effective"
                }
            },
            {
                "tech_name": "Azure",
                "attributes": {
                    "Scalability": "Highly scalable",
                    "Serverless Options": "Azure Functions",
                    "Performance": "High performance",
                    "Community Support": "Wide community",
                    "Security": "Robust",
                    "Cost Efficiency": "Variable pricing"
                }
            },
            {
                "tech_name": "GCP",
                "attributes": {
                    "Scalability": "Easily scalable",
                    "Serverless Options": "Google Cloud Functions",
                    "Performance": "Fast",
                    "Community Support": "Strong",
                    "Security": "Very secure",
                    "Cost Efficiency": "Competitive rates"
                }
            }
        ]
    }
    
    prompt = f"""
    Provide detailed information about {tech_name} focusing on the following parameters: {', '.join(parameters)}.
    Provide the data in JSON format and keep each parameter value short (1-4 words).
    
    Example response format:
    {{
      "tech_name": "{tech_name}",
      "attributes": {{
        "Scalability": "Highly scalable",
        "Serverless Options": "AWS Lambda",
        "Performance": "Optimized",
        "Community Support": "Extensive",
        "Security": "Strong security",
        "Cost Efficiency": "Cost-effective"
      }}
    }}
    
    Please provide the information for {tech_name}.
    """
    
    try:
        response = model.invoke(prompt)
        response_content = response.content
        logging.debug(f"OpenAI response for {tech_name}: {response_content}")
        if response_content:
            return parse_openai_response(response_content)
        else:
            logging.error(f"Empty response received for {tech_name}")
            return {}
    except json.JSONDecodeError as e:
        logging.error(f"JSON decode error for {tech_name}: {e}")
        logging.error(f"Response content: {response_content}")
        return {}
    except Exception as e:
        logging.error(f"Error fetching data for {tech_name}: {e}")
        return {}

def parse_openai_response(response_content):
    try:
        response_data = json.loads(response_content)
        logging.debug(f"Parsed OpenAI response: {response_data}")
        if 'attributes' in response_data:
            return response_data['attributes']
        else:
            logging.error("Attributes not found in the response")
            return {}
    except json.JSONDecodeError as e:
        logging.error(f"JSON decode error: {e}")
        return {}

@router.post("/compare-assistant", response_model=ComparisonResponse)
async def compare_technologies(request: Request):
    request_data = await request.json()
    logging.info(f"Request data: {request_data}")
    comparison_request = ComparisonRequest(**request_data)
    
    if not comparison_request.technologies:
        raise HTTPException(status_code=400, detail="At least one technology must be provided for comparison")

    comparisons = {}
    api_key = Config.OPENAI_API_KEY

    for tech in comparison_request.technologies:
        category = get_technology_category(tech)
        logging.info(f"Category for {tech}: {category}")
        if not category:
            comparisons[tech] = {}
            continue
        
        relevant_parameters = get_relevant_parameters(category)
        logging.info(f"Relevant parameters for {tech} in category {category}: {relevant_parameters}")
        if not relevant_parameters:
            comparisons[tech] = {}
            continue

        comparisons[tech] = fetch_technology_data_from_openai(tech, relevant_parameters, api_key)
        logging.info(f"Data fetched for {tech}: {comparisons[tech]}")

    response_data = []

    for index, (tech, tech_data) in enumerate(comparisons.items(), start=1):
        attributes = {key: tech_data.get(key, None) for key in relevant_parameters}
        tech_comparison = TechnologyComparison(name=tech, attributes=attributes)
        response_data.append({f"tech{index}": tech_comparison})

    logging.info(f"Response data: {response_data}")
    return ComparisonResponse(comparisons=response_data)
