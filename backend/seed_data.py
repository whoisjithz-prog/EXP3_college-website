import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'riverview_core.settings')
django.setup()

from knowledge.models import KnowledgeEntry, KnowledgeCategory
from college_site.models import (
    Department, Course, Faculty, Event, Notice, PlacementStatistic, Facility
)
from datetime import date

def seed_database():
    print("Clearing old data...")
    KnowledgeEntry.objects.all().delete()
    Course.objects.all().delete()
    Department.objects.all().delete()
    Faculty.objects.all().delete()
    Event.objects.all().delete()
    Notice.objects.all().delete()
    PlacementStatistic.objects.all().delete()
    Facility.objects.all().delete()

    print("Seeding Departments...")
    cs_dept = Department.objects.create(
        name="School of Computer Science & Engineering",
        code="CSE",
        description="Pioneering education in computing, software architecture, cloud platforms, and cybersecurity.",
        head_of_dept="Dr. Eleanor Vance",
        icon="code"
    )
    ai_dept = Department.objects.create(
        name="Department of Artificial Intelligence & Data Science",
        code="AIDS",
        description="Cutting-edge research and degree programs in machine learning, neural networks, robotics, and big data.",
        head_of_dept="Dr. Marcus Chen",
        icon="cpu"
    )
    mgmt_dept = Department.objects.create(
        name="Riverview Business School",
        code="RBS",
        description="Cultivating visionary global leaders, entrepreneurs, and finance specialists.",
        head_of_dept="Dr. Robert Sterling",
        icon="briefcase"
    )
    humanities_dept = Department.objects.create(
        name="Department of Humanities & Media Studies",
        code="HMS",
        description="Excellence in journalism, digital media communication, creative writing, and public relations.",
        head_of_dept="Prof. Amanda Brooks",
        icon="book-open"
    )
    sciences_dept = Department.objects.create(
        name="School of Applied Sciences & Biotechnology",
        code="SASB",
        description="State-of-the-art wet labs and research in genetics, biochemistry, and computational biology.",
        head_of_dept="Dr. Vikram Patel",
        icon="flask-conical"
    )

    print("Seeding Courses...")
    Course.objects.create(
        department=cs_dept,
        name="B.Sc. Computer Science",
        code="CS-UG-101",
        degree_level="UG",
        duration="3 Years (6 Semesters)",
        eligibility="10+2 with Mathematics / Computer Science with minimum 60% aggregate marks.",
        annual_fees=12500.00,
        seats=120,
        overview="A rigorous curriculum covering algorithms, full-stack web development, operating systems, cloud engineering, and database design.",
        curriculum_highlights="Data Structures, Cloud Computing, Full-Stack Development, Cyber Defense, Capstone Industry Project."
    )
    Course.objects.create(
        department=ai_dept,
        name="B.Tech Artificial Intelligence & Data Science",
        code="AI-UG-201",
        degree_level="UG",
        duration="4 Years (8 Semesters)",
        eligibility="10+2 with Physics, Chemistry, and Mathematics with minimum 65% aggregate.",
        annual_fees=16000.00,
        seats=90,
        overview="Comprehensive hands-on training with neural networks, computer vision, natural language processing, and high-performance computing.",
        curriculum_highlights="Deep Learning, NLP, Robotics, Big Data Pipelines, Autonomous Systems Lab."
    )
    Course.objects.create(
        department=cs_dept,
        name="M.Sc. Data Science & Big Data Analytics",
        code="DS-PG-301",
        degree_level="PG",
        duration="2 Years (4 Semesters)",
        eligibility="Bachelor's degree in CS, Engineering, Mathematics, or Statistics with minimum 55% marks.",
        annual_fees=18500.00,
        seats=45,
        overview="Advanced masters program designed in collaboration with leading tech firms for future data architects and researchers.",
        curriculum_highlights="Predictive Modeling, Distributed Systems, Generative AI Architectures, Thesis Research."
    )
    Course.objects.create(
        department=mgmt_dept,
        name="Bachelor of Business Administration (BBA)",
        code="BBA-UG-101",
        degree_level="UG",
        duration="3 Years (6 Semesters)",
        eligibility="10+2 from any recognized board with minimum 55% aggregate.",
        annual_fees=11000.00,
        seats=100,
        overview="Holistic business education covering marketing, organizational leadership, corporate finance, and entrepreneurship.",
        curriculum_highlights="Digital Marketing, Corporate Finance, International Trade, Startup Incubation Studio."
    )
    Course.objects.create(
        department=mgmt_dept,
        name="Master of Business Administration (MBA)",
        code="MBA-PG-201",
        degree_level="PG",
        duration="2 Years (4 Semesters)",
        eligibility="Undergraduate degree in any discipline with minimum 50% + Riverview Aptitude Test (RAT) or CAT/GMAT score.",
        annual_fees=22000.00,
        seats=120,
        overview="Globally ranked management program offering specializations in FinTech, Strategic Consulting, and AI for Business.",
        curriculum_highlights="Global Leadership, FinTech Ecosystems, Supply Chain Dynamics, Executive Mentorship."
    )
    Course.objects.create(
        department=humanities_dept,
        name="B.A. Digital Media & Journalism",
        code="MD-UG-101",
        degree_level="UG",
        duration="3 Years (6 Semesters)",
        eligibility="10+2 in any stream with minimum 50% marks.",
        annual_fees=9500.00,
        seats=60,
        overview="Multimedia journalism, podcasting, television broadcasting, digital storytelling, and media ethics.",
        curriculum_highlights="Broadcast Journalism, Digital Content Production, Media Ethics, Campus Radio Studio."
    )
    Course.objects.create(
        department=sciences_dept,
        name="B.Sc. Biotechnology",
        code="BT-UG-101",
        degree_level="UG",
        duration="3 Years (6 Semesters)",
        eligibility="10+2 with Biology, Chemistry, and Physics with minimum 60% aggregate.",
        annual_fees=13000.00,
        seats=50,
        overview="Immersive laboratory-centric degree covering genetic engineering, immunology, and bioinformatics.",
        curriculum_highlights="Molecular Biology, Gene Editing, Fermentation Tech, Pharmaceutical Analytics."
    )

    print("Seeding Faculty...")
    Faculty.objects.create(
        name="Dr. Eleanor Vance",
        designation="Professor & Head of Computer Science",
        department=cs_dept,
        qualification="Ph.D. in Computer Science (Stanford University)",
        email="eleanor.vance@riverview.edu",
        experience_years=16,
        bio="Specializes in distributed cloud infrastructure, microservice architectures, and modern operating systems.",
        avatar_url="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    )
    Faculty.objects.create(
        name="Dr. Marcus Chen",
        designation="Associate Professor in AI & Robotics",
        department=ai_dept,
        qualification="Ph.D. in Artificial Intelligence (UC Berkeley)",
        email="marcus.chen@riverview.edu",
        experience_years=12,
        bio="Author of multiple IEEE papers in computer vision and autonomous robotics. Leads the Riverview AI Innovation Hub.",
        avatar_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    )
    Faculty.objects.create(
        name="Dr. Robert Sterling",
        designation="Dean & Professor of Strategic Management",
        department=mgmt_dept,
        qualification="Ph.D. in Economics & Finance (Wharton School)",
        email="robert.sterling@riverview.edu",
        experience_years=20,
        bio="Former corporate consultant with McKinsey & Co. Advises international fintech ventures and drives RBS corporate partnerships.",
        avatar_url="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    )
    Faculty.objects.create(
        name="Prof. Amanda Brooks",
        designation="Head of Digital Media Studies",
        department=humanities_dept,
        qualification="M.Phil. in Journalism (Columbia University)",
        email="amanda.brooks@riverview.edu",
        experience_years=11,
        bio="Award-winning broadcast journalist and documentary producer. Mentors student investigative reporting at The Riverview Herald.",
        avatar_url="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
    )

    print("Seeding Events...")
    Event.objects.create(
        title="Riverview College Hosts Annual Innovation Summit",
        category="Academic & Research",
        event_date=date(2025, 4, 25),
        time_info="9:30 AM – 5:00 PM",
        venue="Grand Auditorium, Main Campus",
        description="Students, faculty, and industry leaders come together to shape the future of technology, AI, and green entrepreneurship.",
        image_url="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
        is_featured=True
    )
    Event.objects.create(
        title="Career Fair 2025",
        category="Placements & Recruitment",
        event_date=date(2025, 4, 30),
        time_info="9:00 AM – 4:00 PM",
        venue="Riverview Expo Hall & Main Quad",
        description="Over 70 Fortune 500 companies and dynamic tech startups recruiting graduating seniors and offering summer internships.",
        image_url="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
        is_featured=True
    )
    Event.objects.create(
        title="TechVista National Hackathon 2025",
        category="Competitions",
        event_date=date(2025, 5, 12),
        time_info="36-Hour Continuous Event",
        venue="AI & Robotics Innovation Lab",
        description="36-hour code sprint with $15,000 in cash prizes, mentorship from Silicon Valley engineers, and direct hiring interviews.",
        image_url="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
        is_featured=False
    )
    Event.objects.create(
        title="Aura 2025: Annual Cultural Fest",
        category="Cultural",
        event_date=date(2025, 2, 18),
        time_info="5:00 PM – 10:30 PM",
        venue="Open Air Amphitheatre",
        description="Three exhilarating days of musical concerts, celebrity guests, dance battles, and fashion showcases.",
        image_url="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
        is_featured=False
    )

    print("Seeding Notices...")
    Notice.objects.create(
        title="Admissions Open for Academic Year 2025-2026",
        category="Admissions",
        content="Applications for Undergraduate and Postgraduate programs are now open online. Early application deadline is March 31, 2025.",
        is_important=True
    )
    Notice.objects.create(
        title="Riverview Merit & Dean's Scholarship Application Window",
        category="Scholarships",
        content="Eligible students scoring above 88% in qualifying exams may apply for up to 50% tuition waiver. Submit forms before April 15, 2025.",
        is_important=True
    )
    Notice.objects.create(
        title="End Semester Examination Schedule Released",
        category="Academics",
        content="The official timetable for Spring 2025 examinations has been published on the student portal. Practical exams commence from May 5.",
        is_important=False
    )
    Notice.objects.create(
        title="Hostel Room Allotment for Incoming Freshmen",
        category="Hostel",
        content="Online hostel room selection for newly admitted students will open on May 20, 2025. Both AC and Non-AC occupancy options available.",
        is_important=False
    )

    print("Seeding Placement Statistics...")
    PlacementStatistic.objects.create(
        year="2025",
        placement_rate_pct=96.4,
        highest_package_lpa=45.0,
        avg_package_lpa=12.2,
        total_offers=850,
        top_recruiters="Google, Microsoft, Amazon, Cisco, Deloitte, Adobe, Goldman Sachs, Infosys, TCS Digital, Accenture, IBM"
    )

    print("Seeding Facilities...")
    Facility.objects.create(
        name="William Riverview Memorial Library",
        category="Academic",
        description="A 4-storey modern facility housing over 150,000 books, 24/7 digital access to IEEE/ACM/Elsevier journals, and 30 group study pods.",
        timings="Open 24/7 during semester weeks",
        image_url="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
    )
    Facility.objects.create(
        name="Advanced AI & High-Performance Computing Center",
        category="Research",
        description="Equipped with 64 Nvidia H100 GPU clusters, dedicated machine learning servers, and VR/AR development headsets.",
        timings="8:00 AM – 11:00 PM",
        image_url="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
    )
    Facility.objects.create(
        name="Riverview Sports Arena & Aquatic Complex",
        category="Athletics",
        description="Features an Olympic-size swimming pool, 4 wooden indoor badminton courts, FIFA-certified turf soccer field, and fitness gym.",
        timings="6:00 AM – 9:30 PM",
        image_url="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
    )
    Facility.objects.create(
        name="Riverside Residential Halls (Hostels)",
        category="Accommodation",
        description="Twin and single-occupancy rooms with high-speed Wi-Fi, 24/7 biometric security, attached bathrooms, air-conditioning, and meal plans.",
        timings="Resident Access 24/7",
        image_url="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    )

    print("Seeding Knowledge Base Entries (for Gemini Core)...")
    kb_data = [
        {
            "category": KnowledgeCategory.ADMISSIONS,
            "title": "Admissions Process and Eligibility Criteria for 2025-26",
            "keywords": "admission, apply, eligibility, entrance, deadline, requirements, criteria, process, application",
            "content": (
                "Admissions for the 2025-2026 academic year at Riverview College are currently open! "
                "Application steps:\n"
                "1. Fill the online application at the official website portal.\n"
                "2. Upload transcripts (10th & 12th marks for UG, Bachelor's degree for PG).\n"
                "3. Appear for the Riverview Entrance Assessment Test (REAT) or submit valid national test scores (SAT/ACT for UG, CAT/GMAT/GRE for PG).\n"
                "4. Attend a virtual or in-person personal interview with the faculty panel.\n"
                "Key Deadlines:\n"
                "• Early Decision Round: January 15, 2025\n"
                "• Regular Admissions Round: March 31, 2025\n"
                "• Final Spot Counseling: May 15, 2025\n"
                "General Eligibility: Minimum 60% aggregate in 10+2 for science/engineering programs, and 55% for commerce and humanities."
            )
        },
        {
            "category": KnowledgeCategory.FEES,
            "title": "Comprehensive Tuition and Fee Structure 2025",
            "keywords": "fee, fees, tuition, cost, payment, installment, bsc computer science fees, mba fees, hostel fees",
            "content": (
                "Official Fee Structure for Riverview College Academic Programs (Annual Tuition):\n"
                "• B.Sc. Computer Science: $12,500 / year (₹1,80,000 / year)\n"
                "• B.Tech Artificial Intelligence & Data Science: $16,000 / year (₹2,40,000 / year)\n"
                "• M.Sc. Data Science: $18,500 / year (₹2,60,000 / year)\n"
                "• Bachelor of Business Administration (BBA): $11,000 / year (₹1,60,000 / year)\n"
                "• Master of Business Administration (MBA): $22,000 / year (₹3,50,000 / year)\n"
                "• B.A. Digital Media & Journalism: $9,500 / year (₹1,40,000 / year)\n"
                "• B.Sc. Biotechnology: $13,000 / year (₹1,90,000 / year)\n\n"
                "Accommodation & Hostel Fees (Annual):\n"
                "• Standard Double Room (Non-AC with 3 meals/day): $3,200 / year (₹85,000 / year)\n"
                "• Deluxe Double Room (AC with 3 meals/day): $4,500 / year (₹1,20,000 / year)\n"
                "• Single Occupancy Studio: $6,000 / year (₹1,60,000 / year)\n\n"
                "Payment options: Semester-wise installments (50% at registration, 50% mid-semester) with 0% interest financing."
            )
        },
        {
            "category": KnowledgeCategory.COURSES,
            "title": "B.Sc. Computer Science Program Details",
            "keywords": "bsc computer science, bsc cs, computer science, curriculum, duration, bsc",
            "content": (
                "The B.Sc. Computer Science program at Riverview College is a 3-year (6 semesters) undergraduate degree. "
                "Eligibility: 10+2 with Mathematics or Computer Science with at least 60% aggregate marks.\n"
                "Annual Tuition: $12,500 / year (₹1,80,000 / year).\n"
                "Total Seats: 120.\n"
                "Curriculum highlights include Data Structures, Object-Oriented Programming, Database Systems, Cloud Computing, "
                "Web Development, Mobile App Engineering, and an Industry Capstone Project in the final semester. "
                "Graduates enjoy a 98% placement rate with average starting offers around $65,000 / ₹11.5 LPA."
            )
        },
        {
            "category": KnowledgeCategory.COURSES,
            "title": "B.Tech Artificial Intelligence & Data Science Details",
            "keywords": "btech ai, btech data science, artificial intelligence, btech, machine learning, ai course",
            "content": (
                "The B.Tech in Artificial Intelligence & Data Science is a 4-year (8 semesters) flagship degree under the Department of AI & Data Science.\n"
                "Eligibility: 10+2 with Physics, Chemistry, and Mathematics (min 65% aggregate).\n"
                "Annual Tuition: $16,000 / year (₹2,40,000 / year).\n"
                "Total Seats: 90.\n"
                "Highlights: Hands-on neural networks, deep learning, NLP, computer vision, autonomous robotics, and GPU-accelerated computing. "
                "Students undertake industry internships at top AI labs during their third and fourth years."
            )
        },
        {
            "category": KnowledgeCategory.COURSES,
            "title": "Master of Business Administration (MBA) Details",
            "keywords": "mba, business administration, pg course, management, mba fees, mba eligibility",
            "content": (
                "Riverview Business School's MBA is a 2-year full-time postgraduate program accredited globally.\n"
                "Eligibility: Bachelor's degree in any discipline with minimum 50% + valid RAT/CAT/GMAT score.\n"
                "Annual Tuition: $22,000 / year (₹3,50,000 / year).\n"
                "Specializations offered: Strategic Management, FinTech & Analytics, Global Marketing, and Healthcare Leadership.\n"
                "Highest MBA package in 2025 reached $110,000 (₹38 LPA) with top consulting firms."
            )
        },
        {
            "category": KnowledgeCategory.PLACEMENTS,
            "title": "Placements, Packages, and Top Recruiters 2025",
            "keywords": "placement, package, salary, lpa, recruiters, companies, highest package, average package, jobs",
            "content": (
                "Riverview College boasts an outstanding placement track record through its Career Development Center:\n"
                "• Overall Placement Rate: 96.4%\n"
                "• Highest Domestic Package: ₹45.0 LPA ($140,000 International)\n"
                "• Average Package across disciplines: ₹12.2 LPA ($68,000)\n"
                "• Total Job Offers in 2025: 850+ offers from 110 visiting companies\n"
                "Top Recruiters include Google, Microsoft, Amazon, Cisco, Deloitte, Adobe, Goldman Sachs, Infosys, TCS Digital, and Accenture.\n"
                "The college also has an active Startup Incubation Cell that provided seed funding to 12 student startups this year."
            )
        },
        {
            "category": KnowledgeCategory.FACILITIES,
            "title": "Campus Facilities, Library, and Student Accommodation",
            "keywords": "facility, facilities, library, hostel, lab, campus, gym, sports, wifi, accommodation, food, mess",
            "content": (
                "Riverview College is situated on a scenic 65-acre campus with world-class facilities:\n"
                "• William Riverview Memorial Library: 150,000+ print books, 24/7 access during exams, private study pods, digital journals.\n"
                "• High-Performance AI Lab: 64 Nvidia H100 GPUs, robotics prototyping arena, 3D printing studio.\n"
                "• Sports Complex: Olympic-sized heated swimming pool, 4 indoor badminton courts, cricket ground, football turf, tennis courts, modern gym.\n"
                "• Residential Hostels: Separate halls for men and women, 24/7 security with biometric access, high-speed Wi-Fi, air conditioning, laundromat, recreation lounges.\n"
                "• Dining & Cafeterias: Multi-cuisine central dining hall serving nutritious meals, plus coffee shops and juice bars."
            )
        },
        {
            "category": KnowledgeCategory.ADMISSIONS,
            "title": "Scholarships and Financial Aid Opportunities",
            "keywords": "scholarship, financial aid, fee waiver, merit scholarship, discount, funding",
            "content": (
                "Riverview College believes in rewarding merit and supporting students from all financial backgrounds:\n"
                "1. Riverview Merit Scholarship: 50% tuition waiver for candidates scoring above 90% in qualifying boards/exams; 25% waiver for 85-89% score.\n"
                "2. Dean's Athletic Excellence Scholarship: Up to 75% tuition fee exemption for state and national level sports players.\n"
                "3. Women in STEM Fellowship: 30% tuition concession for female students enrolling in B.Tech AI and B.Sc. Computer Science.\n"
                "4. Need-Based Financial Grants: Covers up to 60% of tuition and hostel fees for families with annual income under specified thresholds."
            )
        },
        {
            "category": KnowledgeCategory.EVENTS,
            "title": "Upcoming Campus Events, Innovation Summit, and Fests",
            "keywords": "event, events, summit, career fair, hackathon, fest, upcoming, date, calendar",
            "content": (
                "Major upcoming campus events at Riverview College:\n"
                "• Riverview College Hosts Annual Innovation Summit: April 25, 2025 | Grand Auditorium | 9:30 AM – 5:00 PM. Features keynote talks by tech pioneers and venture capitalists.\n"
                "• Career Fair 2025: April 30, 2025 | 9:00 AM – 4:00 PM | Main Campus Quad & Expo Hall. Over 70 corporate recruiters on campus.\n"
                "• TechVista National Hackathon: May 12-14, 2025 | 36-hour code sprint with $15,000 prize pool.\n"
                "• Cultural Fest 'Aura 2025': February 18-20, 2025 | Musical concerts, fashion shows, and art exhibits."
            )
        },
        {
            "category": KnowledgeCategory.FACULTY,
            "title": "Faculty Profiles and Research Excellence",
            "keywords": "faculty, professor, teachers, hod, dr eleanor vance, dr marcus chen, staff",
            "content": (
                "Our faculty consists of renowned educators and researchers from institutions like Stanford, Berkeley, MIT, and Wharton:\n"
                "• Dr. Eleanor Vance (HOD, Computer Science) - Ph.D. Stanford, 16 years exp, Distributed Systems & Cloud Platforms.\n"
                "• Dr. Marcus Chen (AI & Robotics) - Ph.D. UC Berkeley, 12 years exp, IEEE Senior Member, Generative AI & Autonomous Vision.\n"
                "• Dr. Robert Sterling (Dean, Business School) - Ph.D. Wharton, 20 years exp, Strategic FinTech & Corporate Leadership.\n"
                "• Prof. Amanda Brooks (Head, Media Studies) - M.Phil Columbia, 11 years exp, Broadcast Journalism & Digital Ethics.\n"
                "Faculty-to-student ratio at Riverview College is maintained at 1:12 for personalized mentoring."
            )
        },
        {
            "category": KnowledgeCategory.CONTACT,
            "title": "Official Contact Information, Campus Address, and Office Hours",
            "keywords": "contact, address, phone, email, location, helpline, timings, office, riverview college address",
            "content": (
                "Official Riverview College Contact Information:\n"
                "• Campus Address: 100 Riverside Boulevard, Tech Valley, CA 94016\n"
                "• General Inquiries Email: info@riverview.edu\n"
                "• Admissions Desk Email: admissions@riverview.edu\n"
                "• Admissions Helpline Phone: +1 (800) 555-RIVE (7483) / +1 (800) 555-0199\n"
                "• Hostel & Student Affairs: +1 (800) 555-7484 / hostel@riverview.edu\n"
                "• Office Working Hours: Monday to Friday, 9:00 AM – 5:00 PM (Closed on Sunday and public holidays)\n"
                "• Campus Tours: Every Wednesday and Saturday at 11:00 AM (Advance booking online)."
            )
        },
        {
            "category": KnowledgeCategory.GENERAL,
            "title": "About Riverview College - History, Accreditation, and Vision",
            "keywords": "about, riverview college, history, vision, accreditation, motto, campus, ranking",
            "content": (
                "Riverview College was established in 1984 as an autonomous center of higher learning dedicated to academic excellence, "
                "innovation, and ethical leadership. Motto: 'Learn. Grow. Belong.'\n"
                "Key Accreditations & Rankings:\n"
                "• Accredited with NAAC Grade 'A++' and ABET for engineering programs.\n"
                "• Ranked #12 among national independent colleges for Undergraduate Teaching.\n"
                "• Over 6,500 students from 42 countries and 500+ distinguished faculty members.\n"
                "• 65-acre eco-friendly campus featuring solar energy, rainwater harvesting, and zero-plastic policies."
            )
        }
    ]

    for item in kb_data:
        KnowledgeEntry.objects.create(
            category=item["category"],
            title=item["title"],
            keywords=item["keywords"],
            content=item["content"],
            is_published=True
        )

    print(f"Database seeded successfully with {len(kb_data)} knowledge entries and full college data!")

if __name__ == '__main__':
    seed_database()
