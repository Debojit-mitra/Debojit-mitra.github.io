import axios from "axios";

export default async function handler(req, res) {
  const { endpoint } = req.query;
  const backendUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
  console.log("Backend URL:", backendUrl);

  try {
    // Forward the request to the backend
    const { data } = await axios({
      method: req.method,
      url: `${backendUrl}/api/v1/${endpoint}`,
      data: req.body,
      headers: {
        ...req.headers,
        host: new URL(backendUrl).host,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: error.message });
  }
}
