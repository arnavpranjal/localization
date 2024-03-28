"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, RotateCcw } from "lucide-react";
import { EditIcon } from "lucide-react";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

export default function Roles() {
  const [showAddDialog, setShowAddDialog] = React.useState(false);
  // const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState({
    open: false,
    roleId: null,
  });
  const [showEditDialog, setShowEditDialog] = React.useState({
    open: false,
    roleId: null,
  });
  const [showResetDialog, setShowResetDialog] = React.useState(false);

  const [data, setData] = React.useState([]);
  const { toast } = useToast();

  const handleChange = (index: any, newValue: any) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], displayName: newValue };
      return newData;
    });
  };
  const handleCreateRole = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const formData = new FormData(e.target);
      const newRole = {
        role: formData.get("role"),
      };

      const response = await axios.post("http://localhost:3001/roles", newRole);

      setShowAddDialog(false);

      await fetchData();

      toast({
        title: "Role added succesfully",
        description: "New role was added succesfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };
  const handleEditRole = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const formData = new FormData(e.target);

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      const roleId = formData.get("disabledRole");
      const displayName = formData.get("displayName"); // Get the displayName value from the form data

      const editRole = {
        displayName: displayName, // Pass the displayName value in the request body
      };

      const response = await axios.put(
        `http://localhost:3001/roles/${roleId}`,
        editRole
      );

      setShowEditDialog({ open: false, roleId: null });

      await fetchData();

      toast({
        title: "Role edited succesfully",
        description: "Role was edited succesfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };
  const handleDeleteRole = async (roleId: string) => {
    try {
      const deleteRole = {
        role: roleId,
      };

      console.log(roleId);

      const response = await axios.delete(
        `http://localhost:3001/roles/${roleId}`
      );
      setShowDeleteDialog({ open: false, roleId: null });

      await fetchData();

      toast({
        title: "Role deleted ",
        description: "Role was deleted ",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };
  const handleReset = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/roles/reset`);
      setShowResetDialog(false);

      await fetchData();

      toast({
        title: "Reset Done",
        description: "Reset was succesfull ",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/roles");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="flex">
        <Card className="pt-2 flex-1 mr-1">
          <div className="flex item-center">
            <div className="flex-1">
              <h3 className="mb-2 ml-2.5 block text-lg font-medium text-gray-700">
                System name
              </h3>
            </div>
            <CirclePlus
              className="h-6 w-6 cursor-pointer text-gray-700 mr-2"
              onClick={() => setShowAddDialog(true)}
            />
          </div>

          <div>
            <ul>
              {data.map((item, index) => (
                <div key={index} style={{ borderTop: "1px solid #e2e8f0" }}>
                  <li className="p-2.5">{item.systemName}</li>
                </div>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="pt-2 flex-1 ml-1">
          <div className="flex item-center">
            <div className="flex-1">
              <h3 className="mb-2 ml-2.5 block text-lg font-medium text-gray-700">
                Display name
              </h3>
            </div>
            <RotateCcw
              className="h-6 w-6 cursor-pointer text-gray-700 mr-2"
              onClick={() => setShowResetDialog(true)}
            />
          </div>
          <div>
            <ul>
              {data.map((item, index) => (
                <div
                  key={index}
                  style={{
                    borderTop: "1px solid #e2e8f0",
                  }}
                  className="flex items-center"
                >
                  <input
                    type="text"
                    className="p-2.5 flex-1"
                    value={item.displayName}
                    id={item.systemName}
                    onChange={(e) => handleChange(index, e.target.value)}
                    spellCheck={false}
                    style={{
                      appearance: "none",
                      outline: "none",
                    }}
                    minLength={1}
                    onKeyDown={(e) => {
                      if (
                        (e.key === "Backspace" &&
                          item.displayName.length === 1) ||
                        (e.ctrlKey &&
                          e.key === "x" &&
                          item.displayName.length === 1)
                      ) {
                        e.preventDefault();
                      }
                    }}
                  ></input>
                  <Trash2
                    className={`h-4 w-4 cursor-pointer text-gray-700 mr-2 ${
                      item.default ? "opacity-50 pointer-events-none" : ""
                    }`}
                    onClick={() =>
                      !item.default &&
                      setShowDeleteDialog({
                        open: true,
                        roleId: item.systemName,
                      })
                    }
                  />
                  <EditIcon
                    className="h-4 w-4 cursor-pointer text-gray-700 mr-2"
                    // onClick={() => setShowEditDialog(true)}
                    onClick={() =>
                      setShowEditDialog({
                        open: true,
                        roleId: item.systemName,
                      })
                    }
                  />
                </div>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      <div className="flex justify-end mt-2">
        <Button className="bg-primary hover:bg-primary text-white font-bold rounded focus:outline-none focus:shadow-outline w-24">
          Save
        </Button>
      </div>

      <Dialog open={showAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new role</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateRole} className="space-y-3">
            <div>
              <label
                htmlFor="addrole"
                className="block text-sm font-medium text-gray-700"
              >
                Role System Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="addrole"
                name="role"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex items-center justify-between">
              <a
                onClick={() => setShowAddDialog(false)}
                className="cursor-pointer bg-gray-500 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </a>
              <button
                type="submit"
                className=" bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditDialog.open}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle> Edit role</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditRole} className="space-y-3">
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role System Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={showEditDialog.roleId}
                spellCheck="false"
                disabled
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="displayName"
                className="block text-sm font-medium text-gray-700"
              >
                Role Display Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <input
              type="hidden"
              name="disabledRole"
              value={showEditDialog.roleId}
            />

            <div className="flex items-center justify-between">
              <a
                onClick={() => setShowEditDialog(false)}
                className="cursor-pointer bg-gray-500 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </a>
              <button
                type="submit"
                className=" bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={showDeleteDialog.open}
        onOpenChange={setShowDeleteDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure want to delete this role?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setShowDeleteDialog({ open: false, roleId: null })}
            >
              Cancel
            </AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => handleDeleteRole(showDeleteDialog.roleId)}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              This will reset all the default roles and remove the created ones
              ?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                handleReset();
              }}
            >
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
