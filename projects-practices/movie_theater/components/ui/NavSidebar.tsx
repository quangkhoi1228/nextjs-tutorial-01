import {
  Clapperboard,
  Clock,
  Layers,
  Tag,
  User,
  Calendar,
  FileText,
  BarChart2,
  Settings as SettingsIcon,
  ChartBarIcon
} from "lucide-react";

interface NavSidebarProps {
  active?: string;
}

const menu = [
  { label: "Movies", href: "/admin/movie", icon: Clapperboard },
  { label: "Showtime", href: "/admin/showtime", icon: Clock },
  { label: "Version", href: "/admin/version", icon: Layers },
  { label: "Genre", href: "/admin/genre", icon: Tag },
  { label: "Actor", href: "/admin/actor", icon: User },
  { label: "Booking", href: "/admin/booking", icon: Calendar },
  { label: "Cinemaroom", href: "/admin/cinemaroom", icon: FileText },
  { label: "Memmber", href: "admin/member", icon: BarChart2 },
  { label: "Shedule", href: "admin/schedule", icon: SettingsIcon },
  { label: "Seat", href: "admin/seat", icon: ChartBarIcon },

];  

export default function NavSidebar({ active }: NavSidebarProps) {
  return (
    <nav className="flex-1">
      <ul className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.label}>
              <a
                href={item.href}
                className={`flex items-center gap-2 py-2 px-3 rounded transition ${
                  item.label === active
                    ? "bg-cyan-700 text-white"
                    : "hover:bg-cyan-900 dark:hover:bg-cyan-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
} 