import { FaCamera } from "react-icons/fa";

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

export function ProfilePhoto() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-medium text-white text-base">
                    Upload new profile
                </CardTitle>
                <CardDescription className="font-light">
                    You can upload new profile picture
                </CardDescription>
            </CardHeader>
            <div className="flex flex-col items-center justify-center w-full gap-y-5 pb-5">
                <CardContent className="p-0">
                    <Avatar className="w-16 h-16">
                        <AvatarImage src="" />
                        <AvatarFallback>
                            <FaCamera className="h-6 w-6" />
                        </AvatarFallback>
                    </Avatar>
                </CardContent>
                <button className="text-seccondPrimary font-light text-sm">
                    Upload Photo
                </button>
            </div>
        </Card>
    );
};