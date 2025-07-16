import { NavLink } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";
import { useAuth } from "../contexts/FakeAuthContext";

export default function Homepage() {
    const { isAuthenticated } = useAuth();

    console.log(isAuthenticated);

    const linkDestination = isAuthenticated ? "/app" : "/login";

    return (
        <main className={styles.homepage}>
            <PageNav />
            <section>
                <h1>
                    You travel the world.
                    <br />
                    WorldWise keeps track of your adventures.
                </h1>
                <h2>
                    A world map that tracks your footsteps into every city you
                    can think of. Never forget your wonderful experiences, and
                    show your friends how you have wandered the world.
                </h2>
                <NavLink to={linkDestination} className="cta">
                    Start Tracking now
                </NavLink>
            </section>
        </main>
    );
}
