"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DividerHorizontalIcon } from "@radix-ui/react-icons";
import { collection, and, where, onSnapshot, query } from "firebase/firestore";
import { Check, ChevronsRightLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "../authentication/firebase";

export default function HomePage() {
  const [unV, setUnV] = useState<{
    id: string,
    date: string,
    link: string,
    status: boolean,
  }[]>([]);

  const [v, setV] = useState<{
    id: string,
    date: string,
    link: string,
    status: boolean,
  }[]>([]);

  useEffect(() => {
    const q = query(collection(db, "reel"),
      and(
        where("status", "==", true),
      ));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setV(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          date: doc.data().date,
          link: doc.data().link,
          status: doc.data().status,

        }))
      );
    });

    return () => unsubscribe(); // Cleanup when the component unmounts
  }, []);

  useEffect(() => {
    const q = query(collection(db, "reel"),
      and(
        where("status", "==", false),
      ));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setUnV(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          date: doc.data().date,
          link: doc.data().link,
          status: doc.data().status,

        }))
      );
    });

    return () => unsubscribe(); // Cleanup when the component unmounts
  }, []);
  return (
    <div>
       <div>
        <h1 className=" text-xl font-bold p-5">Verified videos </h1>
        <h1 className="px-8">Presence of fake content is verified with human intelligence</h1>
        {v.map((item) => (
          <Card key={item.id} className="flex flex-col sm:flex-row m-6 border-blue-300  ">
            <CardFooter className="flex flex-col p-4 sm:w-[40%] ">
              <img className="object-cover rounded-lg " src="https://www.internetmatters.org/wp-content/uploads/2020/08/https___specials-images.forbesimg.com_imageserve_5f2b4c9efc3ed7b0659d27ae_0x0.jpg" alt="" />
            </CardFooter>
            <CardContent className="flex flex-col m-6 justify-between sm:w-[45%] ">
              <CardTitle className=" text-center font-bold text-xl">Fake content reel published in instagram</CardTitle>
              <CardDescription className="text-left text-lg">Reel published on {item.date}</CardDescription>
              <p className=" pt-10 ">Link-<a href="">{item.link}</a></p>
            </CardContent>
            <CardFooter className="">
              <div className="flex flex-col items-center text-lg  "><Check />Verified</div>
            </CardFooter>
          </Card>
        ))}

      </div>
      <div>
        <h1 className=" text-xl font-bold p-5">Un-Verified videos </h1>
        {unV.map((item) => (
          <Card key={item.id} className=" flex flex-col sm:flex-row m-6 border-blue-300">
            <CardFooter className="flex flex-col p-4 sm:w-[40%] ">
              <img className="object-cover rounded-lg" src="https://www.internetmatters.org/wp-content/uploads/2020/08/https___specials-images.forbesimg.com_imageserve_5f2b4c9efc3ed7b0659d27ae_0x0.jpg" alt="" />
            </CardFooter>
            <CardContent className="flex flex-col m-2 justify-between sm:w-[45%] ">
              <CardTitle className=" text-center font-bold text-xl">Fake content reel published in instagram</CardTitle>
              <CardDescription className="text-left text-lg">Reel published on {item.date}</CardDescription>
              <p className=" pt-10 ">Link-<a href="">{item.link}</a></p>
            </CardContent>
            <CardFooter>
              <p className="flex flex-col items-center text-lg"> <ChevronsRightLeft /> Un-verified</p>
            </CardFooter>
          </Card>
        ))}

      </div>
     
    </div>

  )
} 