"use client";

import {useEffect, useState} from 'react';
import {WrenchIcon, ChatBubbleLeftRightIcon, FaceSmileIcon, Bars3Icon} from "@heroicons/react/16/solid";
import { usePathname } from "next/navigation";

interface Activity {
    type: string,
    description: string,
    createdAt: string,
    city: string,
    state: string,
    subject: string,
    user: {
        userName: string;
        firstName: string;
        lastName: string;
    };
}
export default function Timeline() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        fetch('/api/timeline')
            .then((res) => res.json())
            .then((data) => {
                setActivities(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [pathname]);

    // Helper to choose a color based on activity type
    const getActivityColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'comment':
                return 'bg-teal-500';
            case 'feedback':
                return 'bg-purple-500';
            case 'post' :
                return 'bg-blue-500';
            case 'event' :
                return 'bg-amber-500';
            default:
                return 'bg-emerald-500';
        }
    };
    const formatTime = (timestamp: string) => {
        // Use your preferred formatting approach
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    const ActivityText = (activity: Activity) => {
        switch (activity.type.toLowerCase()) {
            case 'feedback':
                return (<div className="flex flex-col flex-1 gap-0">
                    <h4 className="text-base font-light text-slate-700">
                        {activity.user.firstName} {activity.user.lastName} gave feedback
                        on {activity.subject} at {formatTime(activity.createdAt)}
                    </h4>
                    <p className="text-sm text-black">
                        {activity.description}
                    </p>
                </div>);
            case 'post':
                return (<div className="flex flex-col flex-1 gap-0">
                    <h4 className="text-base font-light text-slate-700">
                        {activity.user.firstName} {activity.user.lastName} created a post called &ldquo;{activity.description}&ldquo; at {formatTime(activity.createdAt)}
                    </h4>
                </div>);
            case 'event':
                return (<div className="flex flex-col flex-1 gap-0">
                    <h4 className="text-base font-light text-slate-700">
                        {activity.user.firstName} {activity.user.lastName} created a clean-up
                        in {activity.city},{activity.state} at {formatTime(activity.createdAt)}
                    </h4>
                </div>);
            default:
                return (<div className="flex flex-col flex-1 gap-0">
                    <h4 className="text-base font-light text-slate-700">
                        {activity.description}
                    </h4>
                    <p className="text-sm text-black">
                        {formatTime(activity.createdAt)}
                    </p>
                </div>);
        }
    };

    const getActivityIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'comment':
                return <ChatBubbleLeftRightIcon className="size-4"/>;
            case 'feedback':
                return <FaceSmileIcon className="size-4"/>;
            case 'post':
                return <Bars3Icon className="size-4"/>
            case 'event':
                return <WrenchIcon className="size-4"/>
            default:
                return <Bars3Icon className="size-4"/>;
        }
    };
    return (
        <div className="relative w-fit h-80 _transparent_7tz9e_11 rounded-[35px] overflow-y-auto p-4" >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul
                    aria-label="Colored activity feed"
                    role="feed"
                    className="relative flex flex-col gap-12 py-12 pl-8
               before:absolute before:top-0 before:left-8 before:h-full
               before:-translate-x-1/2 before:border before:border-dashed
               before:border-sky-400
               after:absolute after:top-6 after:left-8 after:bottom-6
               after:-translate-x-1/2 after:border after:border-sky-400">
                    {activities.map((activity, idx) => (
                        <li key={`${activity.type}-${idx}`}
                            role="listitem"
                            className="relative pl-8">
                    <span//Icon circle for each activity
                        className={`absolute left-0 z-10 flex items-center justify-center 
                                      w-10 h-10 text-white -translate-x-1/2 rounded-full 
                                      ring-2 ring-sky-500 ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                    </span>
                            <div>
                                {ActivityText(activity)}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
