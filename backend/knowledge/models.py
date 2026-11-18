from django.db import models

class KnowledgeCategory(models.TextChoices):
    ADMISSIONS = 'Admissions', 'Admissions'
    COURSES = 'Courses', 'Courses'
    FEES = 'Fees', 'Fees'
    DEPARTMENTS = 'Departments', 'Departments'
    EVENTS = 'Events', 'Events'
    FACULTY = 'Faculty', 'Faculty'
    FACILITIES = 'Facilities', 'Facilities'
    PLACEMENTS = 'Placements', 'Placements'
    CONTACT = 'Contact', 'Contact'
    GENERAL = 'General', 'General'

class KnowledgeEntry(models.Model):
    category = models.CharField(max_length=50, choices=KnowledgeCategory.choices, default=KnowledgeCategory.GENERAL)
    title = models.CharField(max_length=255)
    content = models.TextField()
    keywords = models.CharField(max_length=500, blank=True, help_text="Comma-separated keywords for retrieval")
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    views_count = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-updated_at']
        verbose_name_plural = 'Knowledge Entries'

    def __str__(self):
        return f"[{self.category}] {self.title}"
