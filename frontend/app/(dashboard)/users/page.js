import UserList from "@/components/users/UserList";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1
            className={
              "text-3xl lg:text-4xl xl:text-5xl font-semibold text-neutral-800"
            }
          >
            Users
          </h1>
          <p className="text-muted-foreground lg:text-xl text-sm">
            Manage all users in the system.
          </p>
        </div>
      </div>

      <UserList />
    </div>
  );
}
