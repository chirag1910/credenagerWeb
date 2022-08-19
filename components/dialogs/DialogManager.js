import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import styles from "../../styles/dialog/dialog.module.css";
import Login from "./Login";

const DialogManager = () => {
    const router = useRouter();
    const { action } = router.query;

    const dialog = useRef(null);

    const [show, setShow] = useState(false);
    const [dismissable, setDismissable] = useState(false);

    useEffect(() => {
        if (router.isReady && action) {
            setShow(true);
            setDismissable(action !== "key");
        }
    }, [router, action]);

    useEffect(() => {
        if (dismissable) {
            window.addEventListener("mousedown", handleMouseClick);
            window.addEventListener("keydown", handleKeyPress);
        }

        return () => {
            window.removeEventListener("mousedown", handleMouseClick);
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [dismissable]);

    const handleKeyPress = (e) => {
        e = e || window.event;
        if (e.code === "Escape") {
            e.preventDefault();
            handleDismiss();
        }
    };

    const handleMouseClick = (e) => {
        if (dialog.current && !dialog.current.contains(e.target)) {
            handleDismiss();
        }
    };

    const handleDismiss = () => {
        setShow(false);
        router.query = {};
        router.replace(router);
    };

    return action && router.isReady ? (
        <>
            <div
                className={[styles.main, show ? styles.show : undefined].join(
                    " "
                )}
            >
                <div className={styles.container} ref={dialog}>
                    {action === "login" ? <Login /> : <></>}
                </div>
            </div>
        </>
    ) : (
        <></>
    );
};

export default DialogManager;
