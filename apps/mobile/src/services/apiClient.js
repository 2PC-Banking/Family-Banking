const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:5288/api";

const fetchWithTimeout = async (url, options = {}, timeoutMs = 15000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(id);
  }
};

export const apiClient = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  console.log("API CALL:", url);

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetchWithTimeout(
      url,
      {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      },
      options.timeout || 15000,
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Có lỗi xảy ra từ máy chủ");
    }

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      console.error(
        `Lỗi API [${endpoint}]: timeout sau ${options.timeout || 15000}ms`,
      );
      throw new Error("Yêu cầu mạng quá lâu, vui lòng thử lại");
    }
    console.error(`Lỗi API [${endpoint}]:`, error);
    throw error;
  }
};
