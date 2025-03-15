import { motion } from "framer-motion";
import { Code, Database, Layout, Box, Wrench, Smartphone } from "lucide-react";
import SkillCard from "../ui/SkillCard";

const About = () => {
  const skills = [
    {
      icon: Code,
      title: "Programming Languages",
      skills: ["Java", "Kotlin", "Python", "Dart", "C++", "C", "JavaScript"],
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      skills: ["Android (Native)", "Flutter"],
    },
    {
      icon: Database,
      title: "Databases",
      skills: ["Oracle Database", "MySQL", "SQLite", "MongoDB", "PostgreSQL"],
    },
    {
      icon: Wrench,
      title: "Development Tools",
      skills: ["Android Studio", "Visual Studio Code", "Anaconda"],
    },
    {
      icon: Box,
      title: "Frameworks & SDKs",
      skills: ["Android SDK", "Flutter", "Flask", "Streamlit"],
    },
    {
      icon: Layout,
      title: "Web Technologies",
      skills: ["HTML", "CSS", "JavaScript", "Node.js", "React.js", "Next.js"],
    },
  ];

  const timelineEvents = [
    {
      year: "2025",
      title: "Intern at Trusnetix Technologies, learning React & Next.js",
      description:
        "Joined Trusnetix Technologies as intern, also learning and working on projects based on React & Next.js",
    },
    {
      year: "2024",
      title: "Exploring ML and AI",
      description:
        "Learning Machine Learning (ML) and Artificial Intelligence (AI), and combining them with Android development.",
    },
    {
      year: "2023",
      title: "Explored python and Web Technologies",
      description:
        "Learning python, its various libraries and Started learning web technologies like React.",
    },
    {
      year: "2022",
      title: "Learning DSA and Advancing in Android development",
      description:
        "Studied Data Structures and Algorithms (DSA) topics and continued advancing Android development (native).",
    },
    {
      year: "2021",
      title: "Expanding Knowledge",
      description:
        "Learned the basics of C and C++, and explored databases like MySQL.",
    },
    {
      year: "2019 - 2020",
      title: "Beginning Coding Journey",
      description:
        "Began learning Java, made desktop apps using NetBeans, and explored web technologies like HTML and CSS.",
    },
  ];

  return (
    <section className="py-20 relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Hi, I'm Debojit Mitra. I'm a passionate Full Stack & Android developer with 4+
            years of experience, crafting unique digital experiences. Currently working as Intern at Trusnetix Technologies and 
            leading Android at Google Developer Students Club, Assam Don Bosco
            University.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8 text-center">
            My Journey
          </h3>
          <div className="max-w-3xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-800" />

            {/* Timeline events */}
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative mb-8"
              >
                <div
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-1/2" />
                  <div className="w-6 h-6 absolute left-1/2 transform -translate-x-1/2 rounded-full bg-blue-500" />
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8"
                    }`}
                  >
                    <div className="bg-light-nebula dark:bg-dark-nebula p-4 rounded-lg">
                      <span className="text-blue-500 font-bold">
                        {event.year}
                      </span>
                      <h4 className="font-semibold mb-1">{event.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">
            Skills & Expertise
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SkillCard {...skill} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
