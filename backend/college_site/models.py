from django.db import models

class Department(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=20, unique=True)
    description = models.TextField()
    head_of_dept = models.CharField(max_length=200, blank=True)
    icon = models.CharField(max_length=50, default='graduation-cap')

    def __str__(self):
        return self.name

class Course(models.Model):
    DEGREE_CHOICES = [
        ('UG', 'Undergraduate'),
        ('PG', 'Postgraduate'),
        ('PHD', 'Doctoral'),
        ('DIP', 'Diploma'),
    ]
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='courses')
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=30, unique=True)
    degree_level = models.CharField(max_length=10, choices=DEGREE_CHOICES, default='UG')
    duration = models.CharField(max_length=50, help_text="e.g. 4 Years (8 Semesters)")
    eligibility = models.TextField(help_text="e.g. 10+2 with Physics, Chem, Math with min 60%")
    annual_fees = models.DecimalField(max_digits=10, decimal_places=2, help_text="Annual tuition fees")
    seats = models.PositiveIntegerField(default=60)
    overview = models.TextField()
    curriculum_highlights = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} ({self.code})"

class Faculty(models.Model):
    name = models.CharField(max_length=200)
    designation = models.CharField(max_length=150)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='faculty_members')
    qualification = models.CharField(max_length=255)
    email = models.EmailField()
    experience_years = models.PositiveIntegerField(default=5)
    bio = models.TextField(blank=True)
    avatar_url = models.URLField(blank=True)

    class Meta:
        verbose_name_plural = 'Faculty'

    def __str__(self):
        return f"{self.name} - {self.designation}"

class Event(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100, default='Academic')
    event_date = models.DateField()
    time_info = models.CharField(max_length=100, default='9:00 AM - 4:00 PM')
    venue = models.CharField(max_length=200, default='Main Campus')
    description = models.TextField()
    image_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['event_date']

    def __str__(self):
        return f"{self.title} ({self.event_date})"

class Notice(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100, default='Admissions')
    date_posted = models.DateField(auto_now_add=True)
    content = models.TextField()
    is_important = models.BooleanField(default=False)
    attachment_url = models.URLField(blank=True)

    class Meta:
        ordering = ['-date_posted']

    def __str__(self):
        return self.title

class PlacementStatistic(models.Model):
    year = models.CharField(max_length=10, default='2025')
    placement_rate_pct = models.DecimalField(max_digits=5, decimal_places=2, default=96.4)
    highest_package_lpa = models.DecimalField(max_digits=6, decimal_places=2, default=45.0)
    avg_package_lpa = models.DecimalField(max_digits=6, decimal_places=2, default=12.2)
    total_offers = models.PositiveIntegerField(default=850)
    top_recruiters = models.TextField(help_text="Comma-separated company names")

    def __str__(self):
        return f"Placements {self.year}"

class Facility(models.Model):
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=100, default='Campus')
    description = models.TextField()
    timings = models.CharField(max_length=100, default='8:00 AM - 8:00 PM')
    image_url = models.URLField(blank=True)

    class Meta:
        verbose_name_plural = 'Facilities'

    def __str__(self):
        return self.name
