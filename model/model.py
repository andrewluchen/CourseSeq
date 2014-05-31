from sqlalchemy import Column, Integer, String

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key = True)
    andrewId = Column(String, unique = True, nullable = False)

    def __init__(self, andrewId):
        self.andrewId = andrewId

    def __repr__(self):
        return "<User(andrewId=%s)>" % self.andrewId
    
    def toJSONSerializable(self):
        return {'id' : self.id,
                'user': self.andrewId}

major_category_table = Table('major_category', metadata,
                             Column('major_id', Integer, ForeignKey('major.id')),
                             Column('category_id',  Integer, ForeignKey('category.id')),
                            )

category_subcategory_table = Table('category_subcategory', metadata,
                                   Column('category_id', Integer, ForeignKey('category.id')),
                                   Column('subcategory_id',  Integer, ForeignKey('subcategory.id')),
                                  )

subcategory_course_table = Table('subcategory_course', metadata,
                                 Column('subcategory_id', Integer, ForeignKey('subcategory.id')),
                                 Column('course_id',  Integer, ForeignKey('course.id')),
                                )

class Major(Base):
    __tablename__ = 'majors'
    
    id = Column(Integer, primary_key = True)
    name = Column(String)
    
    categories = relationship("Category", secondary=major_category_table)
    
    def __init__(self, name = ""):
        self.name = name

    def __repr__(self):
        return '<Major("%s")>' % self.name

    def toJSONSerializable(self):
        return {'id' : self.id,
                'name': self.name}

class Category(Base):
    __tablename__ = 'categories'
    
    id = Column(Integer, primary_key = True)
    name = Column(String)
    
    subcategories = relationship("Sub-Category", secondary=category_subcategory_table)
    
    def __init__(self, name = ""):
        self.name = name

    def __repr__(self):
        return '<Category("%s")>' % self.name

    def toJSONSerializable(self):
        return {'id' : self.id,
                'name': self.name}

class Subcategory(Base):
    __tablename__ = 'subcategories'
    
    id = Column(Integer, primary_key = True)
    name = Column(String)
    number_needed = Column(Integer)
    
    subcategories = relationship("Courses", secondary=subcategory_course_table)
    
    def __init__(self, name = ""):
        self.name = name

    def __repr__(self):
        return '<Sub-Category("%s")>' % self.name

    def toJSONSerializable(self):
        return {'id' : self.id,
                'name': self.name,
                'number_needed': self.number_needed}

class Course(Base):
    __tablename__ = 'courses'
    
    id = Column(Integer, primary_key = True)
    courseNumber = Column(Integer, nullable= False)
    
    def __init__(self, courseNumber):
        self.courseNumber = courseNumber

    def __repr__(self):
        return '<Course("%d", "%s")>' % self.courseNumber

    def toJSONSerializable(self):
        return {'id' : self.id,
                'courseNumber' : self.courseNumber}


