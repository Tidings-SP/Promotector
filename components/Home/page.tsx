import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DividerHorizontalIcon } from "@radix-ui/react-icons";
import { Check, ChevronsRightLeft } from "lucide-react";

export default function homepage() {
  return (
    <div>
      <div>
        <h1 className=" text-xl font-bold p-5">Un Verified videos </h1>
        <Card className=" flex flex-col sm:flex-row m-6 border-blue-300">
          <CardFooter className="flex flex-col p-4 sm:w-[40%] ">
            <img className="object-cover rounded-lg" src="https://www.internetmatters.org/wp-content/uploads/2020/08/https___specials-images.forbesimg.com_imageserve_5f2b4c9efc3ed7b0659d27ae_0x0.jpg" alt="" />
          </CardFooter>
          <CardContent className="flex flex-col m-6 justify-between sm:w-[45%] ">
            <CardTitle className=" text-center font-bold text-xl">Scam reel published in instagram</CardTitle>
            <CardDescription className="text-left text-lg">reel published on Aug 5 , 2016</CardDescription>
            <p className=" pt-10 ">Link-<a href="">https://rell.insta.com</a></p>
          </CardContent>
          <CardFooter>
            <p className="text-lg"> <ChevronsRightLeft /> Un Verified</p>
          </CardFooter>
        </Card>
      </div>
      <div>
        <h1 className=" text-xl font-bold p-5">Verified videos </h1>
        <Card className="flex flex-col sm:flex-row m-6 border-blue-300  ">
          <CardFooter className="flex flex-col p-4 sm:w-[40%] ">
            <img className="object-cover rounded-lg " src="https://www.internetmatters.org/wp-content/uploads/2020/08/https___specials-images.forbesimg.com_imageserve_5f2b4c9efc3ed7b0659d27ae_0x0.jpg" alt="" />
          </CardFooter>
          <CardContent className="flex flex-col m-6 justify-between sm:w-[45%] ">
            <CardTitle className=" text-center font-bold text-xl">Scam reel published in instagram</CardTitle>
            <CardDescription className="text-left text-lg">reel published on Aug 5 , 2016</CardDescription>
            <p className=" pt-10 ">Link-<a href="">https://rell.insta.com</a></p>
          </CardContent>
          <CardFooter>
            <p className="text-lg  "><Check />Verified</p>
          </CardFooter>
        </Card>
      </div>
    </div>

  )
} 