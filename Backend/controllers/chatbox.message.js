import User from "../models/user.model.js";
import Bot from "../models/bot.model.js";



export const Message = async (req,res)=>{

    try{
        const {text}=req.body;
        if(!text?.trim()){
            return res.status(400).json({error:"TEXT CANNOT BE EMPTY"});
        }

        const user= await User.create({
            sender:"user",
            text
        })
        //DATA
        const botResponses = {
  "hello": "Hello! 👋 How can I help you today?",

  "hi": "Hi there! What would you like to know?",

  "how are you":
    "I'm doing great! Thanks for asking. How can I assist you?",

  "what is your name":
    "I'm your AI ChatBot, built to help you with coding, interviews, and more.",

  "who created you":
    "I was created by a developer using JavaScript, Node.js, and AI technologies.",

  "bye":
    "Goodbye! Have a wonderful day. 👋",

  "thank you":
    "You're welcome! Happy to help.",

  "what is critical thinking":
    "Critical thinking is analyzing facts logically to make informed decisions.",

  "what is time management":
    "Time management is planning and organizing your time effectively.",

  "what is coding interview":
    "A coding interview evaluates your programming and problem-solving skills.",

  "what is behavioural interview":
    "Behavioral interviews focus on your past experiences and workplace behavior.",

  "how to introduce yourself":
    "Introduce yourself with your name, education, experience, skills, and career goals.",

  "what is resume":
    "A resume summarizes your education, projects, experience, and skills.",

  "how to crack interview":
    "Practice coding, revise fundamentals, prepare HR questions, and communicate confidently.",

  "what is group discussion":
    "A group discussion evaluates communication, teamwork, leadership, and reasoning skills.",

  "what is html":
    "HTML is the standard markup language used to structure web pages.",

  "what is css":
    "CSS is used to style and design web pages.",

  "what is javascript":
    "JavaScript is a programming language used to make websites interactive.",

  "what is react":
    "React is a JavaScript library for building user interfaces.",

  "what is node js":
    "Node.js is a JavaScript runtime that allows you to run JavaScript on the server.",

  "what is express":
    "Express.js is a lightweight framework for building web applications with Node.js.",

  "what is mongodb":
    "MongoDB is a NoSQL database that stores data as documents.",

  "what is sql":
    "SQL is a language used to manage and query relational databases.",

  "what is api":
    "An API allows different software applications to communicate with each other.",

  "what is json":
    "JSON is a lightweight data format used to exchange information.",

  "what is github":
    "GitHub is a platform for hosting and collaborating on Git repositories.",

  "what is git":
    "Git is a version control system used to track code changes.",

  "what is dsa":
    "DSA stands for Data Structures and Algorithms, essential for coding interviews.",

  "what is oop":
    "Object-Oriented Programming organizes code using classes and objects.",

  "what is ai":
    "Artificial Intelligence enables machines to perform tasks requiring human intelligence.",

  "what is machine learning":
    "Machine Learning is a branch of AI where systems learn from data.",

  "what is chatbot":
    "A chatbot is software that simulates conversations with users.",

  "what is full stack development":
    "Full-stack development involves both frontend and backend development.",

  "frontend":
    "Frontend development focuses on the user interface using HTML, CSS, and JavaScript.",

  "backend":
    "Backend development manages servers, databases, and application logic.",

  "what is database":
    "A database stores and organizes information efficiently.",

  "what is cloud computing":
    "Cloud computing provides computing services over the internet.",

  "what is debugging":
    "Debugging is the process of finding and fixing errors in code.",

  "what is algorithm":
    "An algorithm is a step-by-step procedure to solve a problem.",

  "what is data structure":
    "A data structure organizes data for efficient access and modification.",

  "what is recursion":
    "Recursion is a function calling itself until a base condition is met.",

  "what is array":
    "An array stores multiple values in a single variable.",

  "what is linked list":
    "A linked list is a linear data structure where nodes are connected by pointers.",

  "what is stack":
    "A stack follows the Last In First Out (LIFO) principle.",

  "what is queue":
    "A queue follows the First In First Out (FIFO) principle.",

  "what is binary tree":
    "A binary tree is a hierarchical data structure where each node has at most two children.",

  "what is operating system":
    "An operating system manages hardware and software resources.",

  "what is dbms":
    "A Database Management System stores, retrieves, and manages databases.",

  "what is networking":
    "Networking connects computers to exchange data and resources.",

  "what is http":
    "HTTP is the protocol used for communication between web browsers and servers.",

  "what is https":
    "HTTPS is the secure version of HTTP using encryption.",

  "what is jwt":
    "JWT is a token-based authentication method for secure applications.",

  "what is authentication":
    "Authentication verifies a user's identity.",

  "what is authorization":
    "Authorization determines what an authenticated user can access.",

  "what is npm":
    "NPM is the Node Package Manager used to install JavaScript packages.",

  "what is vscode":
    "Visual Studio Code is a popular source code editor.",

  "what is deployment":
    "Deployment is the process of making an application available to users.",

  "what is vercel":
    "Vercel is a cloud platform used to deploy frontend applications.",

  "what is render":
    "Render is a cloud platform for deploying web applications and APIs.",

  "what is netlify":
    "Netlify is a hosting platform for modern web projects.",

  "what is docker":
    "Docker packages applications into containers for consistent deployment.",

  "what is linux":
    "Linux is an open-source operating system widely used for servers.",

  "tips for interview":
    "Be confident, practice coding, communicate clearly, and stay calm.",

  "career advice":
    "Keep learning, build projects, contribute to GitHub, and practice DSA consistently.",

  "how to improve coding":
    "Solve coding problems daily, read documentation, and build real-world projects.",

  "best programming language":
    "It depends on your goals. JavaScript, Python, Java, and C++ are all excellent choices.",

  "what is software engineer":
    "A software engineer designs, develops, tests, and maintains software applications.",

  "what is internship":
    "An internship provides practical work experience for students or beginners.",

  "what is portfolio":
    "A portfolio showcases your projects, skills, and achievements.",

  "motivate me":
    "Every expert was once a beginner. Keep learning and never give up! 🚀",

  "tell me a joke":
    "Why do programmers prefer dark mode? Because light attracts bugs! 😄",

  "what can you do":
    "I can answer programming questions, help with interviews, explain concepts, and chat with you.",

  "what is python":
    "Python is a beginner-friendly programming language used for automation, web development, data science, and AI.",

  "what is java":
    "Java is a popular object-oriented programming language known for its portability and strong ecosystem.",

  "what is cplusplus":
    "C++ is a powerful language used for system programming, game development, and performance-critical software.",

  "what is sql database":
    "A SQL database stores data in structured tables and uses SQL for querying and management.",

  "how to learn programming":
    "Start with one language, practice daily, build small projects, and read official documentation.",

  "how to get a job":
    "Build a strong portfolio, practice coding problems, prepare for interviews, and network with others.",

  "what is a framework":
    "A framework is a pre-built structure that helps developers build applications faster and more consistently.",

  "what is a library":
    "A library is a collection of reusable code that helps solve common programming tasks.",

  "what is ui ux":
    "UI/UX focuses on how a product looks and how users experience it.",

  "how to prepare for interview":
    "Start by reviewing core concepts, practicing coding problems, preparing stories for behavioral questions, and doing mock interviews.",

  "how do i prepare for interview":
    "Focus on fundamentals, revise your projects, practice speaking clearly, and rehearse answers to common questions.",

  "interview preparation tips":
    "Research the company, practice with a timer, prepare questions for the interviewer, and review your resume thoroughly.",

  "how to answer tell me about yourself":
    "Give a short summary of your background, key skills, projects, and what you are looking for next.",

  "how to answer strength and weakness":
    "Pick a real weakness and explain how you are improving it, while highlighting a strength that matches the role.",

  "how to answer why should we hire you":
    "Show your relevant skills, problem-solving ability, growth mindset, and how you can add value to the team.",

  "how to prepare for technical interview":
    "Practice data structures, algorithms, debugging, system design basics, and explain your thought process clearly.",

  "what is frontend developer":
    "A frontend developer builds the visual and interactive part of websites and applications.",

  "what is backend developer":
    "A backend developer handles servers, databases, and the logic that powers applications.",

  "what is full stack developer":
    "A full stack developer works on both frontend and backend parts of an application.",

  "how to prepare for coding interview":
    "Practice DSA, review common algorithms, solve problems out loud, and prepare for behavioral questions.",

  "what is resume format":
    "A resume format should be clean, concise, tailored to the role, and highlight achievements clearly.",

  "how to write a cover letter":
    "A cover letter should introduce you, explain your interest, and highlight your strongest qualifications.",

  "what is project management":
    "Project management is the process of planning, organizing, and guiding a project from start to finish.",

  "what is teamwork":
    "Teamwork means collaborating effectively with others to achieve common goals.",

  "what is communication skills":
    "Communication skills involve expressing ideas clearly, listening well, and understanding others.",

  "how to stay motivated":
    "Break tasks into small steps, celebrate progress, and keep a steady routine.",

  "what is cyber security":
    "Cybersecurity protects systems, networks, and data from digital threats.",

  "what is cloud":
    "Cloud computing delivers computing resources and services over the internet instead of local hardware.",

  "what is api testing":
    "API testing checks that application programming interfaces work correctly and return expected results.",

  "what is version control":
    "Version control tracks changes to files and helps teams collaborate safely.",

  "what is git hub":
    "GitHub is a platform for hosting Git repositories and collaborating on software projects.",

  "what is open source":
    "Open source software is code that is publicly available for others to use, modify, and improve.",

  "what is web development":
    "Web development is the creation of websites and web applications for users on the internet.",

  "what is mobile development":
    "Mobile development is the creation of applications for phones and tablets.",

  "what is software testing":
    "Software testing is the process of checking that an application works correctly and is free of bugs.",

  "what is agile":
    "Agile is a project management approach that emphasizes collaboration, flexibility, and iterative progress.",

  "what is scrum":
    "Scrum is an Agile framework that organizes work into short, time-boxed development cycles.",

  "default":
    "Sorry, I don't understand that yet. Could you ask something else?"
};
const normalizedText = text.toLowerCase().trim();
const botResponse = botResponses[normalizedText] || "SORRY I CAN'T UNDERSTAND";
const bot = await Bot.create({
    text:botResponse
})
return res.status(200).json({
    userMessage:user.text,
    botMessage:bot.text,
    status: "success",
    timestamp: new Date().toISOString(),
    isFallback: !botResponses[normalizedText]
})
    } catch (error) {
console.log("Error In Message Controller:",error);
return res.status(500).json({error:"Internal Server Error"});

    }
};

