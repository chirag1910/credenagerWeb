import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../../styles/homePage/groups.module.css";
import GroupCard from "./GroupCard";
import AddGroup from "./AddGroup";

const Groups = ({ groups, dataLoaded }) => {
    const router = useRouter();
    const { type, id } = router.query;

    const [groupType, setGroupType] = useState("");
    const [groupId, setGroupId] = useState("");

    const [showAddDialog, setShowAddDialog] = useState(false);

    useEffect(() => {
        if (router.isReady) {
            setGroupType(type === "group" ? "group" : "all");
            setGroupId(id);
        }
    }, [type, id, router]);

    const handleGroups = (type, id, name) => {
        router.replace({
            href: "",
            query: {
                type,
                name,
                id,
            },
        });
    };

    return (
        <>
            <div className={styles.main}>
                {dataLoaded ? (
                    <>
                        <div className={styles.container}>
                            <GroupCard
                                name="All"
                                icon={
                                    <svg viewBox="0 0 403 403" fill="none">
                                        <path d="M20.246 322.341L22.5921 322.476C31.8275 323.549 39.1551 330.876 40.2278 340.112L40.3631 342.458V362.575H60.4802L62.8263 362.71C72.8313 363.872 80.5974 372.375 80.5974 382.692C80.5974 393.009 72.8313 401.512 62.8263 402.674L60.4802 402.809H20.246L17.8999 402.674C8.66448 401.601 1.33687 394.273 0.264187 385.038L0.128845 382.692V342.458L0.264187 340.112C1.33687 330.876 8.66448 323.549 17.8999 322.476L20.246 322.341ZM382.354 322.341L384.7 322.476C393.166 323.459 400.029 329.698 401.94 337.845L402.336 340.112L402.471 342.458V382.692L402.336 385.038C401.353 393.504 395.114 400.367 386.967 402.278L384.7 402.674L382.354 402.809H342.12L339.774 402.674C329.769 401.512 322.003 393.009 322.003 382.692C322.003 373.169 328.62 365.191 337.507 363.106L339.774 362.71L342.12 362.575H362.237V342.458L362.372 340.112C363.356 331.646 369.595 324.783 377.742 322.872L380.008 322.476L382.354 322.341ZM221.417 362.575C232.528 362.575 241.534 371.582 241.534 382.692C241.534 393.802 232.528 402.809 221.417 402.809H181.183C170.073 402.809 161.066 393.802 161.066 382.692C161.066 371.582 170.073 362.575 181.183 362.575H221.417ZM20.246 161.404C31.3564 161.404 40.3631 170.41 40.3631 181.521V221.755C40.3631 232.865 31.3564 241.872 20.246 241.872C9.13559 241.872 0.128845 232.865 0.128845 221.755V181.521C0.128845 170.41 9.13559 161.404 20.246 161.404ZM382.354 161.404C393.465 161.404 402.471 170.41 402.471 181.521V221.755C402.471 232.865 393.465 241.872 382.354 241.872C371.244 241.872 362.237 232.865 362.237 221.755V181.521C362.237 170.41 371.244 161.404 382.354 161.404ZM382.354 0.466553L384.7 0.601895C393.936 1.67457 401.263 9.00219 402.336 18.2376L402.471 20.5837V60.8179L402.336 63.164C401.263 72.3994 393.936 79.727 384.7 80.7997L382.354 80.9351L380.008 80.7997C370.773 79.727 363.445 72.3994 362.372 63.164L362.237 60.8179V40.7008H342.12L339.774 40.5655C329.769 39.4034 322.003 30.9005 322.003 20.5837C322.003 10.2669 329.769 1.76396 339.774 0.601895L342.12 0.466553H382.354ZM60.4802 0.466553L62.8263 0.601895C72.8313 1.76396 80.5974 10.2669 80.5974 20.5837C80.5974 30.1069 73.9802 38.0845 65.0929 40.1695L62.8263 40.5655L60.4802 40.7008H40.3631V60.8179L40.2278 63.164C39.2445 71.6298 33.0053 78.4925 24.8586 80.4038L22.5921 80.7997L20.246 80.9351L17.8999 80.7997C9.4341 79.8164 2.57139 73.5773 0.660155 65.4306L0.264187 63.164L0.128845 60.8179V20.5837L0.264187 18.2376C1.24748 9.77181 7.48665 2.90909 15.6333 0.997863L17.8999 0.601895L20.246 0.466553H60.4802ZM261.652 80.9351C293.792 80.9351 320.065 106.06 321.9 137.74L322.003 141.286V261.989C322.003 294.13 296.878 320.403 265.198 322.238L261.652 322.341H140.949C108.808 322.341 82.5354 297.216 80.6998 265.535L80.5974 261.989V141.286C80.5974 109.146 105.722 82.8731 137.403 81.0375L140.949 80.9351H261.652ZM261.652 121.169H140.949C130.632 121.169 122.129 128.935 120.967 138.94L120.832 141.286V261.989C120.832 272.306 128.598 280.809 138.603 281.971L140.949 282.106H261.652C271.968 282.106 280.471 274.34 281.633 264.335L281.769 261.989V141.286C281.769 130.97 274.003 122.467 263.998 121.305L261.652 121.169ZM221.417 0.466553C232.528 0.466553 241.534 9.4733 241.534 20.5837C241.534 31.6941 232.528 40.7008 221.417 40.7008H181.183C170.073 40.7008 161.066 31.6941 161.066 20.5837C161.066 9.4733 170.073 0.466553 181.183 0.466553H221.417Z" />
                                    </svg>
                                }
                                selected={groupType === "all"}
                                onClick={() => {
                                    handleGroups("all");
                                }}
                            />
                        </div>
                        <div className={styles.header}>
                            <p>Groups</p>
                            <button
                                type="button"
                                onClick={() => setShowAddDialog(true)}
                            >
                                New
                                <svg viewBox="0 0 15 14" fill="none">
                                    <path d="M7.422 0.131149C7.12819 0.131149 6.84641 0.245381 6.63866 0.448716C6.4309 0.652051 6.31419 0.927832 6.31419 1.21539V5.55235H1.88294C1.58913 5.55235 1.30736 5.66659 1.0996 5.86992C0.891847 6.07326 0.775131 6.34904 0.775131 6.63659C0.775131 6.92415 0.891847 7.19993 1.0996 7.40327C1.30736 7.6066 1.58913 7.72083 1.88294 7.72083H6.31419V12.0578C6.31419 12.3454 6.4309 12.6211 6.63866 12.8245C6.84641 13.0278 7.12819 13.142 7.422 13.142C7.71581 13.142 7.99758 13.0278 8.20534 12.8245C8.41309 12.6211 8.52981 12.3454 8.52981 12.0578V7.72083H12.9611C13.2549 7.72083 13.5366 7.6066 13.7444 7.40327C13.9522 7.19993 14.0689 6.92415 14.0689 6.63659C14.0689 6.34904 13.9522 6.07326 13.7444 5.86992C13.5366 5.66659 13.2549 5.55235 12.9611 5.55235H8.52981V1.21539C8.52981 0.927832 8.41309 0.652051 8.20534 0.448716C7.99758 0.245381 7.71581 0.131149 7.422 0.131149Z" />
                                </svg>
                            </button>
                        </div>
                        <div className={styles.container}>
                            {groups.map((group) => (
                                <GroupCard
                                    key={group._id}
                                    name={group.name || "Ungrouped"}
                                    icon={null}
                                    selected={
                                        groupType === "group" &&
                                        (group._id || undefined) ===
                                            (groupId || undefined)
                                    }
                                    onClick={() => {
                                        handleGroups(
                                            "group",
                                            group._id,
                                            group.name
                                        );
                                    }}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.container}>
                            {Array.from(Array(8).keys()).map((group, i) => (
                                <GroupCard key={i} loaded={false} />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {showAddDialog && (
                <AddGroup close={() => setShowAddDialog(false)} />
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        groups: state.data.groups,
        dataLoaded: state.data.loaded,
    };
};

export default connect(mapStateToProps)(Groups);
