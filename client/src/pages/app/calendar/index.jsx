import LoggedInLayout from "@/components/templates/LoggedInLayout";
import React, { Fragment, useEffect, useState } from "react";

import { Calendar as RBCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/fragments/Modal";
import { addNewEvent, editEvent, exampleEvent } from "@/redux/eventsDux";
import { useForm } from "react-hook-form";
import Input from "@/components/fragments/Input";
import Textarea from "@/components/fragments/Textarea";
import MenuItem from "@/components/fragments/MenuItem";

moment.locale("es");

const localizer = momentLocalizer(moment);

const messages = {
   today: "Hoy",
   previous: "Anterior",
   next: "Siguiente",
   month: "Mes",
   week: "Semana",
   day: "Día",
   agenda: "Agenda",
   date: "Fecha",
   time: "Hora",
   event: "Evento",
};

const isFirstDateGreater = (fDate, sDate) => {
   return new Date(fDate).getTime() >= new Date(sDate).getTime();
};

const startDate = new Date();
startDate.setHours(startDate.getHours() + 2);

const endDate = new Date();
endDate.setDate(startDate.getDate() + 3);

const initialEvent = {
   title: "",
   description: "",
   category: "Eventos",
   start: startDate,
   end: endDate,
   id: Date.now(),
};

const Calendar = () => {
   const dispatch = useDispatch();

   const { signatures = [] } = useSelector((state) => state.signatures);
   const { events } = useSelector((state) => state.events);

   const {
      setValue,
      getValues,
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({ defaultValues: initialEvent });

   const [isClient, setIsClient] = useState(false);
   const [isEventModalActive, setIsEventModalActive] = useState(false);
   const [eventData, setEventData] = useState(null);
   const [isEditingEvent, setIsEditingEvent] = useState(false);

   const handleSetEventData = (eventData) => {
      setEventData(eventData);
      setIsEventModalActive(false);
   };

   const handleSetEvent = () => {
      if (!eventData) return;

      if (isEditingEvent) {
         dispatch(editEvent(eventData));
         reset();
         return;
      }

      dispatch(addNewEvent({ ...eventData, id: Date.now().toString(32) }));
      setEventData(null);
      reset();
   };

   const handleEditEvent = (eventData) => {
      Object.entries(eventData).forEach(([key, value]) => {
         setValue(key, value, { shouldValidate: true });
      });

      setIsEditingEvent(true);
      setIsEventModalActive(true);
   };

   useEffect(() => {
      setIsClient(true);
   }, []);

   return (
      <>
         <Modal
            onTrasitionEnd={handleSetEvent}
            onClose={() => setIsEventModalActive(false)}
            isModalActive={isEventModalActive}
         >
            <form onSubmit={handleSubmit(handleSetEventData)} className="new-note-form">
               <h2 className="new-note-title mb-4">Crea tu nuevo evento</h2>
               <Input
                  label="Titulo"
                  placeholder="Requerido"
                  {...register("title", {
                     required: "El titulo es requrido",
                  })}
                  error={!!errors.title}
                  helperText={errors.title?.message}
               />
               <Textarea
                  label="Descripcion"
                  placeholder="Requerido"
                  {...register("description", {
                     required: "La Descripcion es requrida",
                  })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
               />
               <MenuItem
                  values={["Eventos", ...signatures]}
                  onChange={(value) => console.log(value)}
                  label="Asignar a"
                  defaultValue={getValues("category")}
                  className="mb-4"
               >
                  {["Eventos", ...signatures].map((name) => (
                     <Fragment key={name}>{name}</Fragment>
                  ))}
               </MenuItem>
               <Input
                  label="Fecha de inicio"
                  type="date"
                  placeholder="Requerido"
                  {...register("start", {
                     required: "La fecha de incio es requrida",
                     validate: (val) =>
                        isFirstDateGreater(val, getValues("end"))
                           ? "La fecha de incio no puede ser mayor que la de finalizacion"
                           : undefined,
                  })}
                  value={getValues("start")?.toJSON().slice(0, 10)}
                  error={!!errors.start}
                  helperText={errors.start?.message}
               />
               <Input
                  label="Fecha de finalizacion"
                  type="date"
                  placeholder="Requerido"
                  {...register("end", {
                     required: "La fecha de finalizacion es requrida",
                  })}
                  value={getValues("end")?.toJSON().slice(0, 10)}
                  error={!!errors.end}
                  helperText={errors.end?.message}
               />
               <div className="d-flex justify-content-center">
                  <button className="btn-primary btn-create-note text-center">
                     {isEditingEvent ? "Editar evento" : "Crear evento"}
                  </button>
               </div>
            </form>
         </Modal>
         {isClient && (
            <LoggedInLayout
               pageTitle="Calendario"
               blockTitle="Calendario de eventos"
               buttonText="Nuevo evento"
               onBtnHeaderClick={() => setIsEventModalActive(true)}
            >
               <div className="calendar-page h-100 p-2">
                  <RBCalendar
                     className="h-100"
                     localizer={localizer}
                     events={events}
                     startAccessor="start"
                     endAccessor="end"
                     messages={messages}
                     onSelectEvent={handleEditEvent}
                  />
               </div>
            </LoggedInLayout>
         )}
      </>
   );
};

export default Calendar;
