import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const supabase = createClient();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const userRole = session?.user?.user_metadata?.role;
        setIsAdmin(userRole === "Admin");
      } catch (err) {
        console.error("Error checking admin status:", err);
      }
    };

    checkAdminStatus();
  }, []);

  return isAdmin;
};

export default useAdmin;
