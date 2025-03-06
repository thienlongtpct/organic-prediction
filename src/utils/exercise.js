const exercise = [
    [
        {"vi": "Lấy địa chỉ IP của mta.edu.vn.", 
        "en": "Retrieve the IP address of mta.edu.vn.", 
        "solution": ""},
       
        {"vi": "Tìm tên nhà cung cấp dịch vụ Internet (ISP) của mta.edu.vn.", 
        "en": "Find the Internet Service Provider (ISP) of mta.edu.vn.", 
        "solution": ""},
    
        {"vi": "Lấy thông tin WHOIS của mta.edu.vn.", 
        "en": "Retrieve WHOIS information of mta.edu.vn.", 
        "solution": ""},
    
        {"vi": "Xác định vị trí địa lý của máy chủ mta.edu.vn.", 
        "en": "Determine the geographical location of mta.edu.vn's server.", 
        "solution": ""},
    
        {"vi": "Lấy tiêu đề HTTP của mta.edu.vn.", 
        "en": "Retrieve the HTTP headers of mta.edu.vn.", 
        "solution": ""},
    
        {"vi": "Kiểm tra chứng chỉ SSL của mta.edu.vn.", 
        "en": "Check the SSL certificate of mta.edu.vn.", 
        "solution": ""},
    
        {"vi": "Phân tích công nghệ được sử dụng trên mta.edu.vn.", 
        "en": "Analyze the technologies used on mta.edu.vn.", 
        "solution": ""},
    
        {"vi": "Tìm tất cả subdomain của mta.edu.vn.", 
        "en": "Find all subdomains of mta.edu.vn.", 
        "solution": ""},
    
        {"vi": "Lấy danh sách cổng mở trên máy chủ mta.edu.vn.", 
        "en": "Retrieve a list of open ports on mta.edu.vn's server.", 
        "solution": ""},
    
        {"vi": "Kiểm tra lịch sử DNS của mta.edu.vn.", 
        "en": "Check the DNS history of mta.edu.vn.", 
        "solution": ""},
    
        {"vi": "Tìm các website chạy trên cùng một máy chủ với mta.edu.vn.", 
        "en": "Find websites hosted on the same server as mta.edu.vn.", 
        "solution": ""},
    
        {"vi": "Xác định hệ điều hành của máy chủ mta.edu.vn.", 
        "en": "Identify the operating system of mta.edu.vn's server.", 
        "solution": ""},
    
        {"vi": "Phân tích tốc độ tải trang của mta.edu.vn.", 
        "en": "Analyze the page load speed of mta.edu.vn.", 
        "solution": ""},
    
        {"vi": "Tìm danh sách email liên kết với mta.edu.vn.", 
        "en": "Find a list of emails associated with mta.edu.vn.", 
        "solution": ""},
    
        {"vi": "Lấy danh sách các đường dẫn quan trọng trên mta.edu.vn.", 
        "en": "Retrieve a list of important paths on mta.edu.vn.", 
        "solution": ""}
    ],
    [
        {"vi": "Lấy tiêu đề tin tức mới nhất từ VnExpress.", 
        "en": "Get the latest news headlines from VnExpress.", 
        "solution": ""},
        
        {"vi": "Lấy danh sách bài viết theo chuyên mục từ Vietnamnet.", 
        "en": "Retrieve a list of articles by category from Vietnamnet.", 
        "solution": ""},
        
        {"vi": "Tìm kiếm tin tức theo từ khóa trên Tuổi Trẻ.", 
        "en": "Search for news articles by keyword on Tuổi Trẻ.", 
        "solution": ""},
        
        {"vi": "Lấy danh sách tác giả từ ZingNews.", 
        "en": "Extract the list of authors from ZingNews.", 
        "solution": ""},
        
        {"vi": "Lọc tin tức theo thời gian từ Thanh Niên.", 
        "en": "Filter news by time from Thanh Niên.", 
        "solution": ""},
        
        {"vi": "Tổng hợp nội dung bài viết từ Báo Mới.", 
        "en": "Summarize article content from Báo Mới.", 
        "solution": ""},
        
        {"vi": "Lấy danh sách bình luận trên Dân Trí.", 
        "en": "Retrieve the list of comments from Dân Trí.", 
        "solution": ""},
        
        {"vi": "Lấy danh sách liên kết trong bài viết trên VTV News.", 
        "en": "Extract a list of links from articles on VTV News.", 
        "solution": ""},
        
        {"vi": "Lấy danh sách sản phẩm từ Tiki.", 
        "en": "Retrieve a list of products from Tiki.", 
        "solution": ""},
        
        {"vi": "Lấy danh sách sự kiện từ Ticketbox.", 
        "en": "Retrieve a list of events from Ticketbox.", 
        "solution": ""},
        
        {"vi": "Lấy danh sách công việc từ VietnamWorks.", 
        "en": "Extract job listings from VietnamWorks.", 
        "solution": ""},
    ]
]

export const prefix = [
    {"vi": "Sử dụng ngôn ngữ lập trình Python hoặc các công cụ khác, thực hiện yêu cầu sau:\n", "en": "Use Python programming language or other tools to implement the following requirements:\n"},
    {"vi": "Sử dụng ngôn ngữ lập trình Python và thư viện BeautifulSoup để thực hiện yêu cầu sau:\n", "en": "Use prgramming language Python with BeautifulSoup library to implement this exercise:\n"},
]

export const defaultExercise = {"vi": "Vui lòng nhập mã học viên.", "en": "Please submit your student ID.", "solution": ""}

export const isValidStudentId = (studentId) => {
    if (BigInt(studentId) < BigInt(0)) return false;
    if (BigInt(studentId) >= BigInt(9007199254740991)) return false;
    return true;
}

export const getExercise = (studentId, exerciseNumber) => {
    const hackedCase = {"vi": "Bạn hack thành công", "en": "Successfully hacked", "solution": ""};
    if (!isValidStudentId) return hackedCase;
    return exercise[exerciseNumber][BigInt(studentId) % BigInt(exercise[exerciseNumber].length)];
}