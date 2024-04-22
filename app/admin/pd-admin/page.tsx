"use client"
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import { getDoc, doc, and, collection, onSnapshot, query, where, deleteDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/app/authentication/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCheck, Trash2, Undo } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function PdAdmin() {
  const router = useRouter();
  const [uid, setUid] = useState<string | null>("");
  const [pass, setPass] = useState<string | null>("");
  const [access, setAccess] = useState(false);
  const [verified, setVerified] = useState(false);

  const [reel, setReel] = useState<{
    id: string,
    link: string,
  }[]>([]);

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
        if (!userData?.access) {
          router.push("/home");
        }
      }
    }

    fetch();


  }, [router, uid])

  async function verify() {

    if (uid) {
      const snap = await getDoc(doc(db, "user", uid));
      const userData = snap.data();
      if (snap.exists()) {
        setAccess(snap.data().access);

      }
      // Check access here and perform routing
      if (userData?.access && userData?.adminPass == pass) {
        setVerified(true);
      }
    }


  }

  useEffect(() => {
    const q = query(collection(db, "reel"),
      and(
        where("request", "==", true),
        where("status", "==", false),
      ));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setReel(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          link: doc.data().link,
        }))
      );
    });

    return () => unsubscribe(); // Cleanup when the component unmounts
  }, []);

  async function deleteReel(id: string) {
    await deleteDoc(doc(db, "reel", id))
      .then(() => {
        toast({
          title: "Stay Removed Successfully."
        })
      })

  }

  async function verifyReel(id: string) {
    const ref = doc(db, "reel", id);

    await updateDoc(ref, {
      status: true,
      request: false,
    });
  }
  return (
    <section className="p-4 m-2 ">
      {!verified ?
        <div className="flex flex-col w-full max-w-sm items-start gap-2 ps-6">
          <Label className="text-lg ps-2">Admin Pass</Label>
          <div className="flex w-full max-w-sm items-center space-x-2">

            <Input type="password" placeholder="Enter your admin pass..." onChange={(event) => setPass(event.target.value)} />
            <Button onClick={verify}>Verify</Button>
          </div>
        </div>
        :
        <div className='w-full m-auto p-4 border rounded-lg  overflow-y-auto'>
          {reel.map((r) => (
            <div
              key={r.id}

              className='grid grid-cols-1 md:grid-cols-2 hover:bg-primary-foreground rounded-lg my-3 p-4 border  items-center justify-between'
            >
              <div>
                <div className='text-sm'>
                  <span className='font-bold'>Link:</span>{' '}
                </div>
                <div className='font-bold cursor-pointer'

                >{r.link}</div>

                <Button
                  className="mt-2"
                  type="button"
                  onClick={() => {verifyReel(r.id)}}
                  variant={"secondary"}
                >
                  <CheckCheck />
                  <span className="ps-2">Verify</span>
                </Button>
              </div>
              <div className='flex flex-col items-end gap-2'>

                <Button
                  className="mt-2"
                  type="button"
                  onClick={() => { deleteReel(r.id) }}
                  variant={"destructive"}
                >
                  <Trash2 />
                  <span className="ps-2">Delete</span>
                </Button>
                <div>
                </div>

              </div>

            </div>
          ))}

        </div>
      }
      <Toaster />
    </section>
  )
}