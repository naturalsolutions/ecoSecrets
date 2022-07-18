from sqlmodel import create_engine, SQLModel, Session
from sqlalchemy_utils import create_database, drop_database, database_exists
from decouple import config
from services import user
from models import models
from schemas.schemas import UserCreate

db_user = config('DB_USER')
db_pwd = config('DB_PASSWORD')
db_name = config('DB_NAME')

DATABASE_URL = f"postgresql://{db_user}:{db_pwd}@annotation_db/{db_name}"

engine = create_engine(DATABASE_URL, echo=True)
if database_exists(engine.url):
    drop_database(engine.url)
create_database(engine.url)

def init_db():
    SQLModel.metadata.drop_all(engine)
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        role = models.Roles(role="user", description= "default_user")
        session.add(role)
        session.commit()
        user.create_user(db=session, user=UserCreate(name='jeanjacques', email='jj@gmail.com', password='password'))
        project = models.Projects(name="frist project", description="desc firt project", owner_id=1, contact_id=1 )
        session.add(project)
        session.commit()
        project = models.Projects(name="second project", description="desc second project", owner_id=1, contact_id=1 )
        session.add(project)
        session.commit()
        deploy = models.Deployments(name="frist deploy", description="desc firt project", bait="aurélie", feature="fruitin tree", project_id=1 )
        session.add(deploy)
        session.commit()

# Dependency 
def get_db():
    with Session(engine) as session:
        yield session