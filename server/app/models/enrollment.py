# class Enrollment(Base):
#     __tablename__ = "enrollments"

#     id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

#     student_id = Column(
#         UUID(as_uuid=True),
#         ForeignKey("students.id"),
#         nullable=False,
#         index=True
#     )

#     class_id = Column(
#         UUID(as_uuid=True),
#         ForeignKey("classes.id"),
#         nullable=False,
#         index=True
#     )

#     status = Column(
#         Enum("ENROLLED", "DROPPED", "COMPLETED", name="enrollment_status"),
#         nullable=False,
#         default="ENROLLED"
#     )

#     grade = Column(
#         String,
#         nullable=True
#     )

#     created_at = Column(
#         DateTime(timezone=True),
#         server_default=func.now()
#     )
