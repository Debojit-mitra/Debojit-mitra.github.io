import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Delete, CheckCircle, Error } from "@mui/icons-material";
import AdminLayout from "../../src/components/layout/AdminLayout";
import AuthGuard from "../../src/components/auth/AuthGuard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessages,
  selectMessages,
} from "../../src/redux/reducers/portfolioSlice";
import axiosInstance from "../../src/utils/axios";
import { format } from "date-fns";

export default function Messages() {
  const dispatch = useDispatch();
  const messagesState = useSelector(selectMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setOpenDialog(true);
    if (!message.read) {
      markAsRead(message._id);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMessage(null);
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axiosInstance.put(`/contact/${id}/read`, { read: true }, config);
      const updatedMessages = messagesState.messages.map((msg) =>
        msg._id === id ? { ...msg, read: true } : msg
      );
      dispatch(fetchMessages());
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const toggleReadStatus = async (id, currentReadStatus) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axiosInstance.put(
        `/contact/${id}/read`,
        { read: !currentReadStatus },
        config
      );
      dispatch(fetchMessages());
    } catch (error) {
      console.error("Error toggling message read status:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axiosInstance.delete(`/contact/${id}/delete`, config);
      dispatch(fetchMessages());
      handleCloseDialog();
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  if (!messagesState.messages) {
    return (
      <AuthGuard>
        <AdminLayout>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        </AdminLayout>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <AdminLayout>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Messages{" "}
            {messagesState.unread > 0 && (
              <Chip
                label={`${messagesState.unread} unread`}
                color="warning"
                size="small"
                sx={{ ml: 1 }}
              />
            )}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {messagesState.messages.map((message) => (
            <Grid item xs={12} md={6} lg={4} key={message._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  borderLeft: message.read ? "none" : "4px solid #ff9800",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: (theme) => theme.shadows[4],
                  },
                }}
                onClick={() => handleMessageClick(message)}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: message.read ? "normal" : "bold",
                        mb: 1,
                      }}
                    >
                      {message.name}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {message.read ? (
                        <CheckCircle
                          sx={{ color: "success.main", fontSize: 20 }}
                        />
                      ) : (
                        <Error sx={{ color: "warning.main", fontSize: 20 }} />
                      )}
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(message._id);
                        }}
                        sx={{ ml: 1 }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {message.email}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      mb: 2,
                    }}
                  >
                    {message.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {format(new Date(message.createdAt), "PPpp")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          {selectedMessage && (
            <>
              <DialogTitle>
                Message from {selectedMessage.name}
                <Typography variant="body2" color="text.secondary">
                  {selectedMessage.email}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {format(new Date(selectedMessage.createdAt), "PPpp")}
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Typography>{selectedMessage.message}</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Close</Button>
                {selectedMessage && (
                  <Button
                    onClick={() => {
                      toggleReadStatus(
                        selectedMessage._id,
                        selectedMessage.read
                      );
                      handleCloseDialog();
                    }}
                    color="primary"
                  >
                    Mark as {selectedMessage.read ? "Unread" : "Read"}
                  </Button>
                )}
                <Button
                  onClick={() => handleDelete(selectedMessage._id)}
                  color="error"
                >
                  Delete
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </AdminLayout>
    </AuthGuard>
  );
}
