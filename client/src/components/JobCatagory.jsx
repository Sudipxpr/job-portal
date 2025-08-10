import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { setSearchedQuery } from "@/redux/Jobslice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const categories = [
  "FullStack Developer",
  "Mobile Developer",
  "Data Science",
  "UI/UX Designer",
  "Backend Developer",
  "Frontend Developer",
];

const JobCategories = () => {
   const dispatch=useDispatch();
  const navigate=useNavigate();
   const searchJobHandler=(qurey)=>{
      dispatch(setSearchedQuery(qurey));
      navigate("/browse");
    }
  return (
    <div className="py-5 mx-auto ">
      <h1 className="text-center text-3xl font-bold p-2 ">
        Trending <span className="text-indigo-600"> Job categories</span>
      </h1>
      <Carousel
        className="w-full max-w-3xl max-h-2xl mx-auto my-10 px-10"
        opts={{ loop: true }}
      >
        <CarouselContent className="gap-4">
          {categories.map((cat, index) => (
            <CarouselItem
              key={index}
              className="pl-10 basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/3"
            >
              <Card 
              onClick={()=>searchJobHandler(cat)}
              className=" bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg cursor-pointer ">
                <CardContent className="text-center py-2 text-md font-semibold">
                  {cat}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 -ml-10" />
        <CarouselNext className="right-0 -mr-10" />
      </Carousel>
    </div>
  );
};

export default JobCategories;
