from pydantic import BaseModel, Field
from typing import List, Optional, Dict

class ComparisonRequest(BaseModel):
    technologies: List[str]
    relevant_parameters: Optional[List[str]] = None
    output_format: str

class TechnologyComparison(BaseModel):
    name: str
    attributes: Dict[str, Optional[str]] = Field(default_factory=dict)

class ComparisonResponse(BaseModel):
    comparisons: List[Dict[str, TechnologyComparison]]
