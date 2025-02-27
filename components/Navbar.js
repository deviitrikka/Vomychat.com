import { Suspense } from "react";
import NavbarContent from "./NavbarContent"; // Separate the component logic

export default function Navbar() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <NavbarContent />
        </Suspense>
    );
}
