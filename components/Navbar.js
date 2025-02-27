import { Suspense } from "react";
import NavbarComponent from "./NavbarComponent"; // Separate the component logic

export default function Navbar() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <NavbarComponent />
        </Suspense>
    );
}
