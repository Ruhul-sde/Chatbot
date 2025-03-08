// DOM Elements
const chatBtn = document.getElementById('chat-btn');
const chatContainer = document.getElementById('chat-container');
const chatContent = document.getElementById('chat-content');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const minimizeBtn = document.getElementById('minimize-btn');
const voiceBtn = document.querySelector('.voice-btn');

// Example API Key (replace with actual secure key)
const API_KEY = 'AIzaSyAOjOvha9JTz-tn5grExL9YPTVJhJzJN2s';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

// Custom knowledge data
const customKnowledge = {
    "companySummary": "Akshay Software Technologies, established in 1987, is headquartered in Mumbai, India, with a global presence in Dubai, Europe, the Middle East, and Asia.",
    "coreOfferings": "SAP ERP solutions (SAP Business One, SAP S/4HANA), IT staffing and recruitment services, payroll outsourcing, and custom CRM development.",
    "industryExpertise": "Specialized in banking, retail, manufacturing, and engineering, offering AI, ML, and IoT-powered ERP solutions.",
    "clienteleHighlight": "Trusted by Tata Group, NSEIT, HDFC, and others, with long-term relationships spanning over 10 years.",
    "Board Of Directors": "Led by Chairman Mr. Anantapadmanabhan C.V. and Managing Director Ms. Nethraa Ganesan. and Mr. Akshay Anantapadmanabhan Director",
    "visionMission": "Aims to empower employees, clients, and communities by leveraging technology and providing efficient ERP and staffing solutions.",
    "achievements": "Tailored SAP solutions for SMEs, a trusted staffing vendor since 2010, and over a decade of long-standing client relationships.",
    "contactDetails": {
        "mobile": "+91-22-6712 6060",
        "email": "info@akshay.com",
        "website": "https://www.akshay.com",
        "socialMedia": {
            "linkedin": "https://www.linkedin.com/company/akshayltd/",
            "facebook": "https://www.facebook.com/AkshaySoftware",
            "instagram": "https://www.instagram.com/akshay_software/",
            "twitter": "https://x.com/akshay_software"
        }
    },
    "careers or job": "https://akshay.com/careers/",
    "blogs": "https://akshay.com/blogs/",
    "Our Solutions": "As a 37 year old organization, Akshay Software Technologies Private Limited has 200+ professionals on its payroll and has built up healthy reserves, which lend solidity to the organization. With its energy and dynamism, our young sales team is geared to respond to customer requirements with minimum turn-around-time. This has resulted in high levels of customer satisfaction, long-term relationships spanning more than ten years and repeat orders.",
    "SAP Solutions": "SAP Business One is an ERP designed and developed specifically for Small and Medium-Sized Enterprises. It is an affordable, easy-to-implement, complete business management solution that ensures company growth, helps increase proﬁtability and control, reduces costs by increasing automation of your business process.",
    "Staffing & Recruiting Solutions": "Building future-ready organizations is the goal of every HR Head. Akshay, with over 200 man-years of recruitment experience across multiple domains and technologies in UAE and India, partners with its clients in the achievement of this goal by facilitating the acquisition of appropriate talent in a timely manner…",
    "SAP Add-Ons": "We specialize in building SAP Business One Add On's in several industry verticals including manufacturing, chemical, pharmaceutical, textile and much more.",
    "Payroll Management": "Outsource your payroll management to us and we will take care of it. Payroll ERP's can become expensive and cumbersome, so just leave it to us to handle it for you.",
    "CRM Software": "Leverage our proprietary Customer Relationship Management System to serve your customers better on day-to-day basis for better customer satisfaction.",
    "Why Choose Akshay Software?": "Quality Deliverables on Time, Long-Standing Relationships, Experience, Experience and Experience",
    "Customer Success and Clints": "HDFC, Stockholding, Navin Dhanuka, Nilesh Jha",
    "Blogs-Inhouse Hiring vs Staffing Solutions: What to Choose": "Understanding Inhouse Hiring vs Staffing Solutions: A Comprehensive Overview As the recruitment world changes, companies face a big choice. They must decide between in-house hiring or using staffing solutions. This detailed look explores the key traits of these two methods. It highlights their strengths and how they can fit into different needs.",
    "The Cost and price  Implications of Different Hiring Models": "Businesses face a choice between hiring employees directly or using staffing solutions. Each option has its own financial aspects that can affect a company's profits. Let's look at the money matters to think about when picking the best hiring method for your business.",
    "Benefits and Challenges of In-House Recruitment Teams": "Having an in-house recruitment team can bring big benefits to businesses. But, it's important to know the possible downsides too. This part looks at the main points to think about when setting up a permanent hiring team. It focuses on how it affects your company's culture, managing resources, and growing employees.",
    "Blogs-2": "How Staffing Solutions Drive Business Growth During Seasonal Peaks",
    "Our Payroll Management Service Features": "SAP Business One Integration, TDS and Tax Planner, Corresponding Letters, GPS and Location Tracking, Time & Attendance Management, Loan and Advance Management, Leave Management, Payroll and Employee Database",
    "Our Staffing Solutions": "General Staffing, Professional Staffing, Permanent Recruitment, Third-Party Payroll Services",
    "Why Choose Akshay Staffing Services ?": "We empower candidates to achieve more than just their career goals and accelerate their career growth.Join the Akshay software team to grow your IT and NON – IT Careers . Our Offerings include Contract Staffing & Permanent Staffing.",
    "Key Facts About Akshay Staffing Process": "Our professional consultants will handle the multi-stage process of recruitment seamlessly. As a corporate partner to clients, they source qualified professionals to help enhance the client's human capital on the one hand, and on the other, they help individuals optimize their career choices. Our talent sourcer will handle the multi-stage process of recruitment seamlessly. As a corporate partner to clients, we source qualified professionals to help enhance the client's human capital on the one hand, and on the other. We help individuals optimize their career choices. With our extensive local and international network and fully digitalized talent ecosystem approach, we source the best candidate for any role. It can also be adapted to the seasonal nature of business and countering business uncertainties. We currently support the following sectors:IT, Product based IT companies and Banking & Finance",
    "Our Investors": "VIJAY  KUMAR NAIR, KAMESHWAR  TIWARY, PHALGUNI GHOSH, MANNE  GOPIMOHAN, VENKATA  NARASIMHARAO RENDUCHINTALA etc",
    "Cloud Solutions": "Akshay Software provides enterprise-grade cloud solutions with 99.99% uptime guarantee. Our services include:\n- Secure cloud infrastructure with multi-layer security\n- Automated scaling and load balancing\n- Disaster recovery and automated backups\n- One-click deployment and continuous integration\n- 24/7 monitoring and support\n- Cost-effective cloud hosting solutions\n- Multi-cloud and hybrid cloud architectures",
    "AI Solutions": "Akshay Software specializes in delivering cutting-edge AI solutions, including AI-powered sales automation, Ai digital marketing, and lead generation, intelligent customer engagement systems, predictive analytics and business intelligence, advanced Natural Language Processing (NLP) applications, machine learning models for business optimization, tailored AI development services, and seamless AI integration with existing systems.",
};

// Function to generate the bot response
async function generateResponse(prompt) {
    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${response.status} - ${errorData?.error?.message || response.statusText}`);
        }

        const data = await response.json();
        let content = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!content) throw new Error("Invalid response format from API.");

        // Modify the response to avoid unwanted phrases and characters
        let formattedResponse = content.trim();
        
        // Remove "Based on..." or "The provided..." starts
        if (formattedResponse.startsWith("Based on the provided text") || formattedResponse.startsWith("The provided text")) {
            formattedResponse = formattedResponse.replace(/^(Based on the provided text|The provided text)/i, "According to your query");
        }

        // Remove asterisks
        formattedResponse = formattedResponse.replace(/\*+/g, '');
        
        // Replace third-person pronouns with first-person pronouns
        formattedResponse = formattedResponse
            .replace(/\bthey (are|have|offer|provide|specialize|focus|aim|work|deliver)\b/gi, "we $1")
            .replace(/\btheir\b/gi, "our")
            .replace(/\bthem\b/gi, "us")
            .replace(/\bthemselves\b/gi, "ourselves")
            .replace(/Akshay Software Technologies has/gi, "We have")
            .replace(/Akshay Software Technologies offers/gi, "We offer")
            .replace(/Akshay Software Technologies provides/gi, "We provide")
            .replace(/The company/gi, "We")
            .replace(/The organization/gi, "We");

        // Replace full URLs with hyperlinks
        const contactDetails = customKnowledge.contactDetails;
        
        // Replace contact information with hyperlinks
        formattedResponse = formattedResponse
            .replace(/Phone:\s*\+?[\d\s-]+/g, `Phone: <a href="tel:${contactDetails.mobile}">${contactDetails.mobile}</a>`)
            .replace(/Email:\s*[\w\.-]+@[\w\.-]+/g, `Email: <a href="mailto:${contactDetails.email}">${contactDetails.email}</a>`)
            .replace(/Website:\s*https?:\/\/[^\s]+/g, `Website: <a href="${contactDetails.website}" target="_blank">Visit our website</a>`);

        // Replace social media URLs with simple hyperlinks
        formattedResponse = formattedResponse
            .replace(/LinkedIn:\s*https?:\/\/[^\s]+/g, `<a href="${contactDetails.socialMedia.linkedin}" target="_blank">LinkedIn</a>`)
            .replace(/Facebook:\s*https?:\/\/[^\s]+/g, `<a href="${contactDetails.socialMedia.facebook}" target="_blank">Facebook</a>`)
            .replace(/Instagram:\s*https?:\/\/[^\s]+/g, `<a href="${contactDetails.socialMedia.instagram}" target="_blank">Instagram</a>`)
            .replace(/Twitter(?:\s*\(X\))?:\s*https?:\/\/[^\s]+/g, `<a href="${contactDetails.socialMedia.twitter}" target="_blank">Twitter</a>`);

        // Clean up any remaining URLs
        formattedResponse = formattedResponse.replace(/https?:\/\/[^\s]+/g, '');

        // Replace text mentions of social media with hyperlinks
        formattedResponse = formattedResponse.replace(
            /Their social media links are also available: LinkedIn, Facebook, Instagram, and Twitter\. \(Specific URLs are in the knowledge base but not repeated here for brevity\)/g,
            `You can find us on social media: 
            <a href="${contactDetails.socialMedia.linkedin}" target="_blank"><i class="fab fa-linkedin"></i>LinkedIn</a>, 
            <a href="${contactDetails.socialMedia.facebook}" target="_blank"><i class="fab fa-facebook"></i>Facebook</a>, 
            <a href="${contactDetails.socialMedia.instagram}" target="_blank"><i class="fab fa-instagram"></i>Instagram</a>, 
            <a href="${contactDetails.socialMedia.twitter}" target="_blank"><i class="fab fa-twitter"></i>Twitter</a>`
        );

        // Also handle variations of the text
        formattedResponse = formattedResponse.replace(
            /You can find them on social media platforms like LinkedIn, Facebook, Instagram, and Twitter/g,
            `You can find us on social media: 
            <a href="${contactDetails.socialMedia.linkedin}" target="_blank"><i class="fab fa-linkedin"></i>LinkedIn</a>, 
            <a href="${contactDetails.socialMedia.facebook}" target="_blank"><i class="fab fa-facebook"></i>Facebook</a>, 
            <a href="${contactDetails.socialMedia.instagram}" target="_blank"><i class="fab fa-instagram"></i>Instagram</a>, 
            <a href="${contactDetails.socialMedia.twitter}" target="_blank"><i class="fab fa-twitter"></i>Twitter</a>`
        );

        // Add this pattern replacement in generateResponse function
        formattedResponse = formattedResponse.replace(
            /(?:To contact|Contact) Akshay Software Technologies,[\s\S]*?(?:Twitter|X)(?:\.|)(?:\s*Links to these can be found on their website\.)*/gi,
            `You can contact us at:
            <a href="tel:${contactDetails.mobile}"><i class="fas fa-phone"></i>Phone: ${contactDetails.mobile}</a>
            <a href="mailto:${contactDetails.email}"><i class="fas fa-envelope"></i>Email: ${contactDetails.email}</a>
            <a href="${contactDetails.website}" target="_blank"><i class="fas fa-globe"></i>Visit our website</a>

            Connect with us on social media:
            <a href="${contactDetails.socialMedia.linkedin}" target="_blank"><i class="fab fa-linkedin"></i>LinkedIn</a>
            <a href="${contactDetails.socialMedia.facebook}" target="_blank"><i class="fab fa-facebook"></i>Facebook</a>
            <a href="${contactDetails.socialMedia.instagram}" target="_blank"><i class="fab fa-instagram"></i>Instagram</a>
            <a href="${contactDetails.socialMedia.twitter}" target="_blank"><i class="fab fa-twitter"></i>Twitter</a>`
        );

        // Handle all variations of third-person references in contact and social media sections
        formattedResponse = formattedResponse.replace(
            /They also have a presence on several social media platforms:/gi,
            `You can also connect with us on social media:`
        );
        
        formattedResponse = formattedResponse.replace(
            /Akshay Software Technologies can be contacted via:/gi,
            `You can contact us via:`
        );
        
        formattedResponse = formattedResponse.replace(
            /Akshay Software Technologies is present on:/gi,
            `You can find us on:`
        );

        return formattedResponse;
    } catch (error) {
        console.error("Error in generateResponse:", error);
        throw error;
    }
}

// Function to add message to the chat with typing animation
function addMessage(message, isUser) {
    console.log('Adding message:', message, 'isUser:', isUser);
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', isUser ? 'user-message' : 'bot-message');

    const messageText = document.createElement('div');
    messageText.classList.add('message-text');

    messageElement.appendChild(messageText);

    // Add timestamp
    const timestamp = document.createElement('div');
    timestamp.classList.add('timestamp');
    timestamp.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    messageElement.appendChild(timestamp);

    // Append the message to the chat content
    chatContent.appendChild(messageElement);

    // Scroll to the bottom of the chat
    chatContent.scrollTop = chatContent.scrollHeight;

    if (!isUser) {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < message.length) {
                if (message.charAt(i) === '<' && message.includes('</a>', i)) {
                    const endOfHyperlink = message.indexOf('</a>', i) + 4;
                    const hyperlink = message.substring(i, endOfHyperlink);
                    messageText.innerHTML += hyperlink;
                    i = endOfHyperlink;
                } else {
                    messageText.innerHTML += message.charAt(i);
                    i++;
                }
                chatContent.scrollTop = chatContent.scrollHeight;
            } else {
                clearInterval(typingInterval);
            }
        }, 10);
    } else {
        messageText.innerHTML = message;
    }
}

// Function to handle user input
async function handleUserInput() {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, true);
        userInput.value = '';
        sendBtn.disabled = true;

        // Check if the user is asking for specific contact details
        const lowerCaseMessage = userMessage.toLowerCase();
        if (lowerCaseMessage.includes("mobile") || lowerCaseMessage.includes("phone")) {
            // Reply with mobile number as a hyperlink
            addMessage(`Mobile: <a href="tel:${customKnowledge.contactDetails.mobile}" style="text-decoration: none;">${customKnowledge.contactDetails.mobile}</a>`, false);
        } else if (lowerCaseMessage.includes("email")) {
            // Reply with email as a hyperlink
            addMessage(`Email: <a href="mailto:${customKnowledge.contactDetails.email}" style="text-decoration: none;">${customKnowledge.contactDetails.email}</a>`, false);
        } else if (lowerCaseMessage.includes("website")) {
            // Reply with website as a hyperlink
            addMessage(`Website: <a href="${customKnowledge.contactDetails.website}" target="_blank" style="text-decoration: none;">${customKnowledge.contactDetails.website}</a>`, false);
        } else if (lowerCaseMessage.includes("contact") || lowerCaseMessage.includes("details")) {
            // Display all contact details as hyperlinks
            const contactDetails = customKnowledge.contactDetails;
            addMessage(createContactInfoResponse(contactDetails), false);
        } else if (lowerCaseMessage.includes("blogs")) {
            // Reply with blogs link as a hyperlink
            addMessage(`Blogs: <a href="${customKnowledge.blogs}" target="_blank" style="text-decoration: none;">Read our blogs</a>`, false);
        } else if (lowerCaseMessage.includes("careers") || lowerCaseMessage.includes("jobs")) {
            // Reply with careers link as a hyperlink
            addMessage(`Careers: <a href="${customKnowledge["careers or job"]}" target="_blank" style="text-decoration: none;">Apply for a job</a>`, false);
        } else {
            // Build enhanced prompt with custom knowledge
            let enhancedPrompt = `You are a chatbot representing Akshay Software Technologies. Respond as if you are part of the company using first-person pronouns like 'we', 'our', and 'us' instead of 'they', 'their', etc. Use the following knowledge base to answer:\n${JSON.stringify(customKnowledge)}\nUser query: ${userMessage}`;
            console.log('Enhanced Prompt:', enhancedPrompt);

            try {
                const botResponse = await generateResponse(enhancedPrompt);
                console.log('API Response:', botResponse);
                addMessage(botResponse, false);
            } catch (error) {
                addMessage(`Error: ${error.message}`, false);
            }
        }

        sendBtn.disabled = false;
    }
}

// Function to handle quick questions
function sendQuickQuestion(question) {
    userInput.value = question;
    handleUserInput();
}

// Toggle Chat Window
function toggleChatWindow() {
    if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
        chatContainer.style.display = 'flex';
        // Always show welcome message when opening chat
        if (chatContent.children.length === 0) {
            setTimeout(() => {
                addMessage('How can I help you understand more about Akshay Software Technologies and its Services?', false);
            }, 300);
        }
    } else {
        chatContainer.style.display = 'none';
    }
}

// Handle Enter Key Press
function handleEnter(event) {
    if (event.key === 'Enter') {
        handleUserInput();
    }
}

// Initialize all event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chat window as hidden
    if (chatContainer) {
        chatContainer.style.display = 'none';
        chatContent.innerHTML = ''; // Clear any existing content
    }

    // Add click event listeners
    if (chatBtn) {
        chatBtn.addEventListener('click', toggleChatWindow, { passive: true });
    }

    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', toggleChatWindow, { passive: true });
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', handleUserInput, { passive: true });
    }

    if (userInput) {
        userInput.addEventListener('keypress', handleEnter);
        
        // Add focus event to improve mobile experience
        userInput.addEventListener('focus', function() {
            // Slight delay to ensure the virtual keyboard is fully open
            setTimeout(() => {
                chatContent.scrollTop = chatContent.scrollHeight;
            }, 300);
        }, { passive: true });
    }
    
    // Add resize listener for handling orientation changes
    window.addEventListener('resize', function() {
        if (chatContainer.style.display !== 'none') {
            // Update scroll position when window resizes
            chatContent.scrollTop = chatContent.scrollHeight;
        }
    }, { passive: true });
});

function createSocialMediaLinks(socialMedia) {
    const order = ['linkedin', 'facebook', 'instagram', 'twitter'];
    return order.map(platform => {
        if (socialMedia[platform]) {
            const icon = `fa-${platform}`;
            return `<div class="contact-item"><a href="${socialMedia[platform]}" target="_blank"><i class="fab ${icon}"></i>${platform.charAt(0).toUpperCase() + platform.slice(1)}</a>`;
        }
        return '';
    }).join('');
}

function createContactInfoResponse(contactDetails) {
    return `
        <div class="contact-info">
            <div class="contact-heading">Contact Information:
            <div class="contact-list">
                <div class="contact-item"><a href="tel:${contactDetails.mobile}"><i class="fas fa-phone"></i>Phone: ${contactDetails.mobile}</a>
                <div class="contact-item"><a href="mailto:${contactDetails.email}"><i class="fas fa-envelope"></i>Email: ${contactDetails.email}</a>
                <div class="contact-item"><a href="${contactDetails.website}" target="_blank"><i class="fas fa-globe"></i>Website</a>
            <div class="contact-heading">Social Media:
            <div class="social-links">
                ${createSocialMediaLinks(contactDetails.socialMedia)}
    `.trim();
}