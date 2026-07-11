from app.database.session import Base
from app.database.session import engine

# Import models here
from app.models import user
from app.models import mission
from app.models import report
from app.models import setting


def init_db():

    Base.metadata.create_all(bind=engine)