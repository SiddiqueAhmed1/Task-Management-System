"use client";
import { useEffect, useState } from "react";
import { Trash2, ShieldCheck, User, Plus, Edit2, Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { toast } from "sonner";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { getUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserForm from "./UserForm";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);

  const router = useRouter();
  const currentUser = getUser();

  const fetchUser = () => {
    try {
      api
        .get("/users")
        .then((res) => setUsers(res.data))
        .catch(() => toast.error("Failed to load users"))
        .finally(() => setLoading(false));
    } catch {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.role !== "ADMIN") {
      router.replace("/dashboard");
      return;
    }
    fetchUser();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      toast.success("User deleted");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Cannot delete user");
    }
  };

  const handleEditUser = async (id) => {
    try {
      await api.patch(`/users/${id}`);
    } catch (error) {}
  };

  const handleSuccess = () => {
    setOpen(false);
    setEditUser(null);
    fetchUser();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className={"cursor-pointer"}
              onClick={() => setEditUser(null)}
            >
              <Plus size={16} className="mr-2" /> Create User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editUser ? "Edit User" : "Create User"}
              </DialogTitle>
            </DialogHeader>
            <UserForm
              user={editUser}
              onSuccess={handleSuccess}
              onCancel={() => {
                setOpen(false);
                setEditUser(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* user list */}
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <Card
            key={user.id}
            className="shadow-md border-border/50 hover:border-primary/20 transition-all "
          >
            <CardContent className="pt-5 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-lg font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={
                    user.role === "ADMIN"
                      ? "border-green-500/80 text-neutral-600 bg-green-500/20"
                      : "border-slate-500/30 text-slate-400 bg-slate-500/10"
                  }
                >
                  {user.role === "ADMIN" ? (
                    <ShieldCheck size={11} className="mr-1" />
                  ) : (
                    <User size={11} className="mr-1" />
                  )}
                  {user.role}
                </Badge>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <Button
                  size="sm"
                  variant="ghost"
                  className="hover:bg-green-400 gap-3 cursor-pointer h-7 p-2"
                  onClick={() => {
                    setEditUser(user);
                    setOpen(true);
                  }}
                >
                  <Pencil />
                </Button>
                {user.role !== "ADMIN" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className=" gap-3 text-muted-foreground hover:text-destructive cursor-pointer h-7 px-2"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 size={13} /> Delete
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
