import {ShoppingCart} from "lucide-react";

import { Button } from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {FaMagnifyingGlass} from "react-icons/fa6";

const Hero = () => {
  return (
    <section className="overflow-hidden py-32">
      <div className="container">
        <div className="flex flex-col gap-5">
          <div className="relative flex flex-col gap-5">
            <div
              style={{
                transform: "translate(-50%, -50%)",
              }}
              className="absolute top-1/2 left-1/2 -z-10 mx-auto size-[800px] rounded-full border [mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] p-16 md:size-[1300px] md:p-32"
            >
              <div className="size-full rounded-full border p-16 md:p-32">
                <div className="size-full rounded-full border"></div>
              </div>
            </div>
            <span className="mx-auto flex size-16 items-center justify-center rounded-full border md:size-20">
              <ShoppingCart className="size-6" />
            </span>
            <h2 className="mx-auto max-w-5xl text-center text-3xl font-medium text-balance md:text-6xl">
              ClearCart
            </h2>
            <p className="mx-auto max-w-3xl text-center text-muted-foreground md:text-lg">
              Your go to marketplace for buying, selling and renting
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pt-3 pb-12">
              <Button size="lg" asChild>
                <Link to="/browse/all">
                  Browse Items <FaMagnifyingGlass />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
