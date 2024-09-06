import { Icon } from "@/components/Icon";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteMap } from "@/shared/data/siteMap";
import { categoryIcon } from "@/shared/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

export function CategoryTop() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button>
            <Icon className="size-6">{categoryIcon}</Icon>
          </button>
        </SheetTrigger>
        <SheetContent side={"top"} className="pt-16 pb-10 flex justify-center">
          <div className="flex flex-col justify-between space-y-5 md:flex-row md:space-x-16 md:space-y-0">
            {siteMap.map((section) => (
              <section
                key={section.top.value}
                className="flex flex-col space-y-3"
              >
                <SheetTitle className="transition duration-200 ease-linear hover:underline">
                  <Link
                    to={`/category/${section.top.value}`}
                    onClick={handleClose}
                  >
                    {section.top.label}
                  </Link>
                </SheetTitle>
                {section.sub.length > 0 && (
                  <ul className="flex flex-col space-y-1">
                    {section.sub.map((sub) => (
                      <Link
                        to={`/category/${section.top.value}/${sub.value}`}
                        key={sub.value}
                        onClick={handleClose}
                      >
                        <SheetDescription className="transition duration-200 ease-linear hover:text-black hover:underline">
                          {sub.label}
                        </SheetDescription>
                      </Link>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </SheetContent>
        {/*  */}
      </Sheet>
    </div>
  );
}
