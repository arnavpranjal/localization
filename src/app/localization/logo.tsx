"use client";
import { Button } from "@/components/ui/button";

import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import InsertImage from "./insertImage";
import axios from "axios";
export default function Logo() {
  const [logoImage, setLogoImage] = React.useState(null);
  const [showInsertImageDialog, setShowInsertImageDialog] =
    React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const fetchLogo = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3001/logo");

      setLogoImage(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching logo:", error);
    }
  };

  const uploadLogo = async (image: File) => {
    try {
      const formData = new FormData();
      formData.append("file", image);

      const response = await axios.post(
        "http://localhost:3001/logo/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchLogo();

      console.log("Logo uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading logo:", error);
    }
  };
  useEffect(() => {
    fetchLogo();
  }, []);
  if (isLoading) return "Loading...";
  return (
    <>
      <div className="flex items-center justify-center centered-div">
        <div className="bg-gray-300 p-6 rounded-lg logo-card shadow-md flex flex-col items-center min-w-[300px]">
          <h2 className=" font-medium  w-full text-2xl">Update Logo</h2>
          <div className="flex-1"></div>
          {logoImage && logoImage != "" ? (
            <img
              src={logoImage}
              alt="Logo"
              style={{ width: "150px", height: "60px", objectFit: "fill" }}
            />
          ) : (
            <img
              src="../../../logo.png"
              alt="Logo"
              style={{ width: "150px", height: "60px", objectFit: "fill" }}
            />
          )}
          <div className="flex-1"></div>
          <Button
            className="text-white font-bold py-2 px-4 rounded "
            onClick={() => setShowInsertImageDialog(true)}
          >
            Choose File
          </Button>
        </div>
      </div>
      <Dialog open={showInsertImageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <span className="text-2xl">Insert Image</span>
            </DialogTitle>
          </DialogHeader>
          <InsertImage
            setLogoImage={setLogoImage}
            setShowInsertImageDialog={setShowInsertImageDialog}
            updateLogo={uploadLogo}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}