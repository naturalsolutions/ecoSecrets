from datetime import datetime
from typing import Dict, List, Optional, Tuple

from pydantic import BaseModel
from sqlmodel import SQLModel

from src.schemas.schemas import Annotation


class FileInfo(SQLModel):
    hash: str


class File(SQLModel):
    id: str
    name: str
    extension: str
    bucket: str
    date: datetime
    url: str

class AnnotationData(BaseModel):
    annotations: List[Annotation]
    id_group: Optional[str]
    group_observations_id_to_update: Optional[List[str]] = []
    group_observations_id_to_individualize: Optional[
        List[str]
    ] = []  # need to be separated to distinguish from ungrouped observation


class MetadataData(BaseModel):
    date: Optional[str] = None


class UpdateFile(BaseModel):
    metadata: Optional[MetadataData]
    annotations: Optional[AnnotationData]
    deployment_id: int


class FilterResult(BaseModel):
    taxonomy_filters: Dict[str, str]
    date_ranges: Dict[str, Optional[datetime]]


class FilterParams(BaseModel):
    species: Optional[str] = None
    family: Optional[str] = None
    genus: Optional[str] = None
    classe: Optional[str] = None
    order: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None

    def get_filters(self) -> Tuple[Dict[str, str], Dict[str, datetime]]:
        """Transforme les valeurs en dictionnaire utilisable par SQLAlchemy."""
        taxonomy_filters = {}
        date_ranges = {}
        for key, value in self.dict(exclude_none=True).items():
            if value not in [None, ""]:
                if key in ["start_date", "end_date"] and value:
                    try:
                        date_ranges[key] = datetime.fromisoformat(value)
                    except ValueError:
                        raise ValueError(
                            f"Invalid date format for {key}. Expected ISO 8601 (YYYY-MM-DDTHH:MM:SS)"
                        )
                else:
                    taxonomy_filters[key] = value
        return FilterResult(taxonomy_filters=taxonomy_filters, date_ranges=date_ranges)
