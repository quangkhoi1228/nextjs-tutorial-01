interface ApiError {
  message: string | string[];
  error: string;
  statusCode: number;
}

export const handleApiError = (error: any): string => {
  // If it's an API error response
  if (error.response?.data) {
    const apiError: ApiError = error.response.data;
    
    // Handle array of messages
    if (Array.isArray(apiError.message)) {
      return apiError.message.join(', ');
    }
    
    // Handle single message
    if (typeof apiError.message === 'string') {
      return apiError.message;
    }
  }
  
  // Handle network errors
  if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
    return 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.';
  }
  
  // Handle timeout errors
  if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
    return 'Yêu cầu bị timeout. Vui lòng thử lại.';
  }
  
  // Handle generic errors
  if (error.message) {
    return error.message;
  }
  
  // Fallback error message
  return 'Đã xảy ra lỗi không xác định. Vui lòng thử lại.';
};

export const getFieldError = (error: any, fieldName: string): string | null => {
  if (error.response?.data?.message) {
    const messages = Array.isArray(error.response.data.message) 
      ? error.response.data.message 
      : [error.response.data.message];
    
    const fieldError = messages.find(msg => 
      msg.toLowerCase().includes(fieldName.toLowerCase())
    );
    
    return fieldError || null;
  }
  
  return null;
}; 