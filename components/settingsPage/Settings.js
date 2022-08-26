import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { toast } from "react-toastify";
import Link from "next/link";
import nprogress from "nprogress";
import Api from "../../utils/api";
import { setTheme } from "../../utils/theme";
import { logout as logoutAction } from "../../redux/action/auth";
import {
    setCreds as setCredsAction,
    setGroups as setGroupsAction,
} from "../../redux/action/data";
import { setTheme as setThemeAction } from "../../redux/action/misc";
import styles from "../../styles/settingsPage/settings.module.css";
import SettingCard from "./SettingCard";
import ConfirmationDialog from "../ConfirmationDialog";
import ChangePass from "./ChangePass";
import DeleteAccount from "./DeleteAccount";

const Settings = ({
    theme,
    user,
    logoutAction,
    setCredsAction,
    setGroupsAction,
    setThemeAction,
}) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [showChangePass, setShowChangePass] = useState(false);
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    const [showLogout, setShowLogout] = useState(false);

    useEffect(() => {
        loading ? nprogress.start() : nprogress.done();
    }, [loading]);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.info("Copied!");
    };

    const handleTheme = () => {
        setLoading(true);
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        setThemeAction(newTheme);
        toast.success(`Theme changed to ${newTheme}`);
        setLoading(false);
    };

    const handleLogout = async () => {
        setLoading(true);

        const response = await new Api().logout();

        if (response.status === "ok") {
            toast.success(response.message);
            setCredsAction([]);
            setGroupsAction([]);
            logoutAction();
            router.push("/");
        } else {
            toast.error(response.error);
        }

        setLoading(false);
    };

    const handleRedirect = (link) => {
        window.open(link, "_blank");
    };

    return (
        <>
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <Link href="/home">
                            <a>
                                <div className={styles.link}>
                                    <svg viewBox="0 0 64 69" fill="none">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M36.4365 45.1926C40.0778 45.1926 43.0417 48.1354 43.0417 51.7525V61.0555C43.0417 61.8328 43.6648 62.4558 44.4632 62.474H50.2277C54.7703 62.474 58.4631 58.8266 58.4631 54.3444V27.9596C58.4419 26.4172 57.707 24.9655 56.4458 24.0007L36.506 8.09848C33.8295 5.97838 30.0853 5.97838 27.3996 8.10453L7.59589 23.9947C6.28633 24.9897 5.5514 26.4414 5.53628 28.0111V54.3444C5.53628 58.8266 9.22906 62.474 13.7717 62.474H19.5906C20.4102 62.474 21.0756 61.8237 21.0756 61.0253C21.0756 60.8499 21.0968 60.6745 21.1331 60.5081V51.7525C21.1331 48.1565 24.0788 45.2168 27.693 45.1926H36.4365ZM50.2277 67.0106H44.4088C41.0759 66.9319 38.5052 64.3158 38.5052 61.0555V51.7525C38.5052 50.6365 37.5767 49.7292 36.4365 49.7292H27.7081C26.5921 49.7353 25.6696 50.6456 25.6696 51.7525V61.0253C25.6696 61.2521 25.6394 61.4699 25.5759 61.6755C25.2493 64.6697 22.6906 67.0106 19.5906 67.0106H13.7717C6.72789 67.0106 0.999695 61.3277 0.999695 54.3444V27.9899C1.02994 24.9836 2.41511 22.2315 4.8074 20.4198L24.5718 4.55692C28.9239 1.10911 34.9878 1.10911 39.3308 4.55087L59.2374 20.4289C61.5752 22.2103 62.9604 24.9564 62.9997 27.9264V54.3444C62.9997 61.3277 57.2715 67.0106 50.2277 67.0106Z"
                                        />
                                    </svg>
                                    <p>Go Home</p>
                                </div>
                            </a>
                        </Link>
                    </div>
                    <h2>Personalize</h2>

                    <SettingCard
                        heading="Change theme"
                        subheading={`Switch website's theme from ${theme} to ${
                            theme === "light" ? "dark" : "light"
                        }`}
                        icon={
                            theme === "dark" ? (
                                <svg viewBox="0 0 76 76" fill="none">
                                    <path
                                        d="M35.1671 1.22228H40.3894V14.278H35.1671V1.22228Z"
                                        stroke="white"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M52.6267 19.2376L61.7809 10.0833L65.4733 13.7757L56.3191 22.9299L52.6267 19.2376Z"
                                        stroke="white"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M61.2786 35.1671H74.3343V40.3894H61.2786V35.1671Z"
                                        stroke="white"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M52.6266 56.319L56.3189 52.6266L65.4732 61.7809L61.7808 65.4732L52.6266 56.319Z"
                                        stroke="white"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M35.1671 61.2785H40.3894V74.3342H35.1671V61.2785Z"
                                        stroke="white"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M10.0833 61.7808L19.2375 52.6266L22.9299 56.3189L13.7757 65.4732L10.0833 61.7808Z"
                                        stroke="white"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M1.22229 35.1671H14.278V40.3894H1.22229V35.1671Z"
                                        stroke="white"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M10.0833 13.7757L13.7757 10.0833L22.9299 19.2375L19.2375 22.9299L10.0833 13.7757Z"
                                        stroke="white"
                                        strokeWidth="2"
                                    />
                                    <path d="M37.7782 27.3337C39.844 27.3337 41.8633 27.9463 43.5809 29.0939C45.2985 30.2416 46.6372 31.8728 47.4278 33.7813C48.2183 35.6898 48.4251 37.7898 48.0221 39.8159C47.6191 41.8419 46.6244 43.703 45.1637 45.1637C43.703 46.6244 41.8419 47.6191 39.8159 48.0221C37.7898 48.4251 35.6898 48.2183 33.7813 47.4278C31.8728 46.6373 30.2416 45.2985 29.0939 43.5809C27.9462 41.8633 27.3337 39.844 27.3337 37.7783C27.3368 35.0091 28.4382 32.3543 30.3963 30.3963C32.3543 28.4382 35.0091 27.3368 37.7782 27.3337M37.7782 22.1114C34.6796 22.1114 31.6506 23.0303 29.0742 24.7518C26.4978 26.4732 24.4898 28.9201 23.304 31.7828C22.1182 34.6456 21.8079 37.7956 22.4124 40.8347C23.0169 43.8738 24.5091 46.6653 26.7001 48.8564C28.8912 51.0474 31.6827 52.5396 34.7218 53.1441C37.7609 53.7486 40.9109 53.4383 43.7737 52.2525C46.6364 51.0668 49.0832 49.0587 50.8047 46.4823C52.5262 43.9059 53.4451 40.8769 53.4451 37.7783C53.4451 33.6232 51.7945 29.6382 48.8564 26.7001C45.9183 23.762 41.9333 22.1114 37.7782 22.1114Z" />
                                    <path
                                        d="M37.7782 27.3337C39.844 27.3337 41.8633 27.9463 43.5809 29.0939C45.2985 30.2416 46.6372 31.8728 47.4278 33.7813C48.2183 35.6898 48.4251 37.7898 48.0221 39.8159C47.6191 41.8419 46.6244 43.703 45.1637 45.1637C43.703 46.6244 41.8419 47.6191 39.8159 48.0221C37.7898 48.4251 35.6898 48.2183 33.7813 47.4278C31.8728 46.6373 30.2416 45.2985 29.0939 43.5809C27.9462 41.8633 27.3337 39.844 27.3337 37.7783C27.3368 35.0091 28.4382 32.3543 30.3963 30.3963C32.3543 28.4382 35.0091 27.3368 37.7782 27.3337M37.7782 22.1114C34.6796 22.1114 31.6506 23.0303 29.0742 24.7518C26.4978 26.4732 24.4898 28.9201 23.304 31.7828C22.1182 34.6456 21.8079 37.7956 22.4124 40.8347C23.0169 43.8738 24.5091 46.6653 26.7001 48.8564C28.8912 51.0474 31.6827 52.5396 34.7218 53.1441C37.7609 53.7486 40.9109 53.4383 43.7737 52.2525C46.6364 51.0668 49.0832 49.0587 50.8047 46.4823C52.5262 43.9059 53.4451 40.8769 53.4451 37.7783C53.4451 33.6232 51.7945 29.6382 48.8564 26.7001C45.9183 23.762 41.9333 22.1114 37.7782 22.1114Z"
                                        stroke="white"
                                        strokeWidth="2"
                                    />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 59 59" fill="none">
                                    <path
                                        d="M21.6683 3.4564C11.5161 7.5358 3.26172 16.387 3.26172 27.9965C3.26172 35.3195 6.17075 42.3425 11.3489 47.5206C16.527 52.6988 23.55 55.6078 30.873 55.6078C42.4825 55.6078 51.3337 47.3534 55.4131 37.2013C18.2408 44.2069 18.1538 18.3485 21.6683 3.4564Z"
                                        strokeWidth="5.7946"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )
                        }
                        onClick={handleTheme}
                        disabled={loading}
                    />

                    <h2>Account</h2>

                    <SettingCard
                        heading={user?.email}
                        subheading="Is your current email address"
                        icon={
                            <svg viewBox="0 0 16 17" fill="none">
                                <path d="M2.07162 2.9541L2.07118 12.0417C2.07118 13.9194 3.63726 15.4559 5.61713 15.5758L5.86668 15.5833L12.5686 15.5843C12.2557 16.4092 11.4124 17 10.4213 17H5.10758C2.59214 17 0.552979 15.0972 0.552979 12.75V4.95833C0.552979 4.03294 1.18689 3.2457 2.07162 2.9541ZM13.4577 0C14.7154 0 15.735 0.951395 15.735 2.125V12.0417C15.735 13.2153 14.7154 14.1667 13.4577 14.1667H5.86668C4.60896 14.1667 3.58938 13.2153 3.58938 12.0417V2.125C3.58938 0.951395 4.60896 0 5.86668 0H13.4577Z" />
                            </svg>
                        }
                        onClick={() => handleCopy(user?.email)}
                        loading={!user}
                    />

                    <SettingCard
                        heading="Change password"
                        subheading="Change your account password"
                        icon={
                            <svg viewBox="0 0 83 74" fill="none">
                                <path d="M46.1499 0C66.3565 0 82.7263 16.443 82.7263 36.5399C82.7263 56.6369 66.3565 73.0798 46.1499 73.0798C33.3244 73.0798 22.1066 66.4296 15.566 56.3811L21.3393 51.8136C26.4914 60.1812 35.6629 65.7718 46.1864 65.7718C53.9392 65.7718 61.3745 62.692 66.8565 57.21C72.3386 51.728 75.4184 44.2927 75.4184 36.5399C75.4184 28.7871 72.3386 21.3519 66.8565 15.8698C61.3745 10.3878 53.9392 7.30798 46.1864 7.30798C31.2782 7.30798 19.0008 18.4892 17.2103 32.8859H27.2953L13.6294 46.5153L0 32.8859H9.82924C11.6562 14.4333 27.2222 0 46.1499 0ZM56.9657 30.1089C58.7927 30.1454 60.2908 31.607 60.2908 33.4706V50.3155C60.2908 52.1424 58.7927 53.6771 56.9292 53.6771H36.7226C34.8591 53.6771 33.3609 52.1424 33.3609 50.3155V33.4706C33.3609 31.607 34.8591 30.1454 36.6861 30.1089V26.4184C36.6861 20.8277 41.2536 16.2968 46.8076 16.2968C52.3982 16.2968 56.9657 20.8277 56.9657 26.4184V30.1089ZM46.8076 21.4124C44.0671 21.4124 41.8017 23.6413 41.8017 26.4184V30.1089H51.8501V26.4184C51.8501 23.6413 49.5847 21.4124 46.8076 21.4124Z" />
                            </svg>
                        }
                        onClick={() => setShowChangePass(true)}
                        loading={!user}
                        disabled={loading}
                    />

                    <SettingCard
                        heading="Delete Account"
                        subheading="Delete your account permanently deleting all credentials"
                        icon={
                            <svg viewBox="0 0 76 82" fill="none">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M66.6875 27.94C68.3433 28.0763 69.5781 29.5236 69.4458 31.1793C69.4217 31.4519 67.2488 58.357 65.998 69.6426C65.2202 76.6465 60.5937 80.9082 53.6098 81.0365C48.2657 81.1287 43.11 81.1808 38.0706 81.1808C32.6382 81.1808 27.3422 81.1207 22.1023 81.0124C15.3991 80.8801 10.7606 76.5343 10.0028 69.6707C8.73997 58.2848 6.57907 31.4479 6.55902 31.1793C6.42271 29.5236 7.65752 28.0723 9.31327 27.94C10.945 27.8959 12.4203 29.0425 12.5526 30.6942C12.5654 30.8682 13.4488 41.8276 14.4115 52.6709L14.6049 54.8348C15.0897 60.2245 15.5812 65.4036 15.9804 69.0092C16.4094 72.9101 18.5142 74.9226 22.2266 74.9988C32.2493 75.2113 42.4766 75.2233 53.5016 75.0229C57.4466 74.9467 59.5794 72.9742 60.0204 68.9811C61.2632 57.7797 63.4281 30.9668 63.4522 30.6942C63.5845 29.0425 65.0478 27.8878 66.6875 27.94ZM46.4849 1C50.1652 1 53.4006 3.48163 54.3507 7.03771L55.369 12.0932C55.6981 13.7504 57.1525 14.9607 58.8364 14.9873L71.9932 14.9878C73.6529 14.9878 75 16.3348 75 17.9946C75 19.6543 73.6529 21.0014 71.9932 21.0014L58.9539 21.0008C58.9337 21.0012 58.9134 21.0014 58.893 21.0014L58.7952 20.9974L17.2033 21.0009C17.1709 21.0012 17.1386 21.0014 17.1062 21.0014L17.0444 20.9974L4.00683 21.0014C2.34706 21.0014 1 19.6543 1 17.9946C1 16.3348 2.34706 14.9878 4.00683 14.9878L17.1607 14.9837L17.5657 14.9581C19.0743 14.7624 20.328 13.6166 20.6342 12.0932L21.6084 7.21812C22.5986 3.48163 25.834 1 29.5143 1H46.4849ZM46.4849 7.01365H29.5143C28.5522 7.01365 27.7062 7.65912 27.4617 8.58522L26.5276 13.2759C26.4088 13.87 26.236 14.4426 26.0147 14.9888H49.9857C49.7642 14.4426 49.5909 13.87 49.4716 13.2759L48.4974 8.4008C48.293 7.65912 47.447 7.01365 46.4849 7.01365Z"
                                    stroke="white"
                                />
                            </svg>
                        }
                        onClick={() => setShowDeleteAccount(true)}
                        loading={!user}
                        disabled={loading}
                    />

                    <SettingCard
                        heading="Logout"
                        subheading="Logout from this device"
                        icon={
                            <svg viewBox="0 0 34 33" fill="none">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M15.5033 1C19.3146 1 22.4153 4.10073 22.4153 7.91198V9.36418C22.4153 10.0093 21.8918 10.5328 21.2467 10.5328C20.6016 10.5328 20.0781 10.0093 20.0781 9.36418V7.91198C20.0781 5.38777 18.026 3.33723 15.5033 3.33723H7.9073C5.38777 3.33723 3.33723 5.38777 3.33723 7.91198V25.2527C3.33723 27.7753 5.38777 29.8259 7.9073 29.8259H15.5205C18.0322 29.8259 20.0781 27.7816 20.0781 25.2698V23.8005C20.0781 23.1554 20.6016 22.6319 21.2467 22.6319C21.8918 22.6319 22.4153 23.1554 22.4153 23.8005V25.2698C22.4153 29.0717 19.3208 32.1631 15.5205 32.1631H7.9073C4.09917 32.1631 1 29.0639 1 25.2527V7.91198C1 4.10073 4.09917 1 7.9073 1H15.5033ZM28.0934 11.2122L32.6557 15.7542C32.6964 15.7946 32.7328 15.8366 32.7661 15.881L32.6557 15.7542C32.7109 15.8086 32.7599 15.8681 32.8025 15.9315C32.8213 15.9602 32.8394 15.99 32.8561 16.0205C32.8697 16.0444 32.8823 16.0693 32.8939 16.0946C32.9037 16.1169 32.9131 16.1393 32.9219 16.1621C32.9336 16.1917 32.9439 16.2221 32.9529 16.253C32.9597 16.2773 32.966 16.3015 32.9715 16.326C32.9784 16.3558 32.9839 16.3857 32.9882 16.4159C32.9907 16.4355 32.9931 16.4561 32.9949 16.4768C32.9985 16.5123 33 16.5469 33 16.5816L32.9921 16.6782L32.9889 16.7401C32.9885 16.7427 32.9881 16.7453 32.9878 16.748L33 16.5816C33 16.6681 32.9904 16.7537 32.9718 16.837C32.966 16.8616 32.9597 16.8859 32.9527 16.9098C32.9439 16.941 32.9336 16.9714 32.9221 17.0014C32.9131 17.0238 32.9037 17.0462 32.8936 17.0682C32.8823 17.0939 32.8697 17.1188 32.8563 17.1432C32.8394 17.1732 32.8213 17.2029 32.802 17.2317C32.791 17.2488 32.779 17.2656 32.7666 17.2822C32.7295 17.331 32.689 17.3769 32.6453 17.4194L28.0934 21.9525C27.8659 22.18 27.5667 22.2938 27.2691 22.2938C26.9699 22.2938 26.6692 22.18 26.4417 21.9494C25.9867 21.4913 25.9883 20.7527 26.4448 20.2978L29.0001 17.7502H13.0692C12.4241 17.7502 11.9005 17.2266 11.9005 16.5816C11.9005 15.9365 12.4241 15.4129 13.0692 15.4129H29.0032L26.4448 12.8669C25.9883 12.4119 25.9852 11.6734 26.4417 11.2153C26.8967 10.7572 27.6353 10.7572 28.0934 11.2122Z"
                                    stroke="white"
                                />
                            </svg>
                        }
                        onClick={() => setShowLogout(true)}
                        loading={!user}
                        disabled={loading}
                    />

                    <h2>Other</h2>

                    <SettingCard
                        heading="Github"
                        subheading="View project source code"
                        icon={
                            <svg viewBox="0 0 74 73" fill="none">
                                <path
                                    d="M28.2677 67.5851C28.2677 66.4748 28.2261 62.8208 28.2261 58.2901C28.2261 55.1225 29.2724 53.0555 30.4563 52.0028C23.0011 51.1389 15.1587 48.2272 15.1587 35.2014C15.1587 31.493 16.4706 28.4597 18.6143 26.0855C18.272 25.2248 17.1137 21.7692 18.9471 17.0913C18.9471 17.0913 21.766 16.1762 28.1845 20.5725C30.8626 19.8206 33.7359 19.4398 36.5964 19.4334C39.4505 19.4399 42.3238 19.8206 45.0083 20.5725C51.4204 16.1762 54.2393 17.0913 54.2393 17.0913C56.0727 21.7692 54.9209 25.2248 54.5721 26.0855C56.7223 28.4597 58.0213 31.4898 58.0213 35.2014C58.0213 48.256 50.1694 51.1325 42.679 51.9708C43.8916 53.0267 44.9635 55.0969 44.9635 58.2709C44.9635 62.8112 44.9219 66.4716 44.9219 67.5851C44.9219 68.497 45.5267 69.5497 47.2321 69.2234C60.5747 64.7246 70.1896 51.99 70.1896 36.9836C70.1896 18.2144 55.1449 3 36.59 3C18.0416 3 3 18.2112 3 36.9836C3 51.9964 12.6246 64.7342 25.9864 69.2266C27.6566 69.5401 28.2677 68.4906 28.2677 67.5851H28.2677Z"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12.9989 51.3981C16.0738 52.3324 17.2864 53.3563 18.7327 55.7816C20.1757 58.2069 21.8684 60.9139 28.2293 59.3716"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        }
                        onClick={() =>
                            handleRedirect(
                                "https://github.com/chirag1910/credenager-web.git"
                            )
                        }
                    />

                    <SettingCard
                        heading="Playstore"
                        subheading="Download credenager app for your android device"
                        icon={
                            <svg viewBox="0 0 102 110" fill="none">
                                <path d="M0 6.74103V103.102C0.000645567 103.311 0.0629998 103.515 0.179244 103.689C0.295488 103.863 0.460447 103.999 0.653436 104.079C0.846425 104.159 1.05885 104.181 1.26408 104.141C1.46931 104.101 1.65821 104.002 1.80708 103.855L51.9811 54.9241L1.80708 5.98828C1.65821 5.8415 1.46931 5.74194 1.26408 5.70209C1.05885 5.66223 0.846425 5.68386 0.653436 5.76425C0.460447 5.84464 0.295488 5.98022 0.179244 6.15398C0.0629998 6.32775 0.000645567 6.53197 0 6.74103Z" />
                                <path d="M73.0188 34.8182L10.1069 0.157655L10.0677 0.135588C8.98396 -0.452877 7.95414 1.01338 8.84174 1.86666L58.1576 49.0223L73.0188 34.8182Z" />
                                <path d="M8.84669 107.982C7.95419 108.835 8.984 110.301 10.0727 109.713L10.1119 109.691L73.0188 75.03L58.1576 60.821L8.84669 107.982Z" />
                                <path d="M98.4159 48.7942L80.8478 39.1189L64.3291 54.9241L80.8478 70.7219L98.4159 61.0539C103.195 58.4132 103.195 51.435 98.4159 48.7942Z" />
                            </svg>
                        }
                        onClick={() =>
                            handleRedirect(
                                "https://play.google.com/store/apps/details?id=com.credenager"
                            )
                        }
                    />
                </div>
            </div>

            {showLogout && (
                <ConfirmationDialog
                    heading="Logout from this device?"
                    buttonText="Logout"
                    onCancel={() => setShowLogout(false)}
                    onSuccess={handleLogout}
                />
            )}

            {showChangePass && (
                <ChangePass close={() => setShowChangePass(false)} />
            )}

            {showDeleteAccount && (
                <DeleteAccount close={() => setShowDeleteAccount(false)} />
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        theme: state.misc.theme,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutAction: () => dispatch(logoutAction()),
        setGroupsAction: (groups) => dispatch(setGroupsAction(groups)),
        setCredsAction: (creds) => dispatch(setCredsAction(creds)),
        setThemeAction: (theme) => dispatch(setThemeAction(theme)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
