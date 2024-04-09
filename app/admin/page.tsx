"use client"
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import { auth, db } from "../authentication/firebase";
import { getDoc, doc } from "firebase/firestore";

export default function AdminRedirect() {
  const router = useRouter();
  const [uid, setUid] = useState<string | null>("");
  const [access, setAccess] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/authentication/signin");
        return;
      } else {
        setUid(user.uid);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Get user data
  useEffect(() => {
    async function fetch() {
      if (uid) {
        const snap = await getDoc(doc(db, "user", uid));
        const userData = snap.data();
        if (snap.exists()) {
          setAccess(snap.data().access);

        }

          // Check access here and perform routing
          if (userData?.access) {
            router.push("/admin/pd-admin");
          } else {
            alert("You don't have access to this page.");
            router.push("/home");
          }

      }
    }

    fetch();


  }, [router, uid])

  return (
    <>

      <div className="flex items-center justify-center">
        <p className="text-primary text-xl p-8 m-4">Please wait while redirecting...</p>
      </div>
      <div className="bottom-0 fixed w-full">

        <BarLoader color="#DC2626" width='100%' height={10} />
      </div>

    </>
  )
}