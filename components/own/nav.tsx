
import { UserNav } from "./user-nav";
import Image from "next/image";
import atlantinivelLogo from "@/public/atlantinivel-logo-blue.svg";
import Link from "next/link";
import { ModeToggle } from "./dark-toggle";

export function Nav() {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <Link href={'/hub'} className=" pr-2">
                    <Image
                        src={atlantinivelLogo}
                        alt="Hub link"
                        className="  h-[35px] w-auto top-auto left-4 "
                    />
                </Link>
                <div className="ml-auto flex items-center space-x-4">
                    <ModeToggle />
                    <UserNav />
                </div>
            </div>
        </div>
    )
}
