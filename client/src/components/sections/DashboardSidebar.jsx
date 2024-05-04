import { Document, File, TaskCheck } from "@/components/fragments/icons";
import { LuFileSignature } from "react-icons/lu";
import Calendar from "@/components/fragments/icons/Calendar";
import ActiveLink from "../fragments/ActiveLink";
import Logo from "../fragments/Logo";

const DashboardSidebar = () => {
   return (
      <div className="dashboard-sidebar">
         <div className="logo-container d-flex gap-2 align-items-center">
            <Logo />
         </div>
         <nav className="block-links">
            <ActiveLink
               href="/app/quick-notes"
               className="block-item"
               activeClass="active"
            >
               <Document />
               <span>Notas rapidas</span>
            </ActiveLink>
            <ActiveLink
               href="/app/signatures"
               className="block-item"
               activeClass="active"
            >
               <LuFileSignature width={0} height={0} />
               Asignaturas
            </ActiveLink>
            <ActiveLink href="/app/tasks" className="block-item" activeClass="active">
               <TaskCheck />
               Tareas
            </ActiveLink>
            <ActiveLink href="/app/files" className="block-item" activeClass="active">
               <File />
               Archivos
            </ActiveLink>
            <ActiveLink href="/app/calendar" className="block-item" activeClass="active">
               <Calendar />
               Calendario
            </ActiveLink>
         </nav>
      </div>
   );
};

export default DashboardSidebar;
