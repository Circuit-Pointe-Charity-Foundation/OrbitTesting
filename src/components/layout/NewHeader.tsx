
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { toast } from "sonner";
import { useModuleContext } from "@/contexts/ModuleContext";

export const NewHeader: React.FC = () => {
  const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);
  const navigate = useNavigate();
  const { activeModule } = useModuleContext();

  const handleLogout = () => {
    localStorage.removeItem("activeModuleId");
    toast.success("Logging out...");
    setTimeout(() => {
      window.location.href = "/new-login";
    }, 1000);
  };

  return (
    <div className="bg-white w-full flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="text-gray-900">
          <span className="text-xl font-bold text-violet-600">{activeModule.name}</span>
          <span className="text-gray-400 mx-2">|</span>
          <span className="text-sm font-medium">Good Afternoon, <span className="font-semibold">Chioma Ike</span></span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors outline-none">
            <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-sm font-medium text-gray-900">Chioma Ike</div>
              <div className="text-xs text-gray-500">chioma@orbitngos.org</div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-3 py-2 text-sm font-medium border-b">
              <div className="font-medium">Chioma Ike</div>
              <div className="text-xs text-gray-500 mt-1">chioma@orbitngos.org</div>
            </div>
            <DropdownMenuItem className="cursor-pointer">
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600 focus:text-red-600"
              onClick={() => setLogoutDialogOpen(true)}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to logout?
              </AlertDialogTitle>
              <AlertDialogDescription>
                You will be redirected to the login page.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
