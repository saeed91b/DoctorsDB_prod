import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { addDays, format, getHours, getMinutes, isSameDay, setHours, setMinutes, setSeconds } from "date-fns";
import { useStore } from "../../../app/stores/store";
import { useParams } from "react-router-dom";
import { Doctor } from "../../../app/models/doctor";
import { toast } from "react-toastify";


function DoctorDetailedSidebar() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());
    const [timeChanged, setTimeChanged] = useState(false);
    const [dateChanged, setDateChanged] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { appointmentStore: { filterAppointmentTimes, createAppointment, cancelAppointment, hasAppointment, getAppointment } } = useStore();
    const { userStore: { isLoggedIn } } = useStore();
    const { id } = useParams();

    const excludeTimes = (selectedDate: Date): Date[] => {
        return filterAppointmentTimes(id!).filter(x => isSameDay(x, selectedDate));
    }

    const setBookingTime = (selectedDate: Date, selectedTime: Date) => {
        return setHours(setMinutes(setSeconds(selectedDate, 0), getMinutes(selectedTime)), getHours(selectedTime));
    }

    const handleCreate = () => {
        setIsSubmitting(true);
        createAppointment(id!, setBookingTime(selectedDate!, selectedTime!)).then(() => {
            toast.success("Appointment created successfully!");
            setIsSubmitting(false);
        })
    }

    const handleCancel = () => {
        setIsSubmitting(true);
        cancelAppointment(id!).then(() => {
            toast.success("Appointment canceled successfully!")
            setIsSubmitting(false);
        })
    }

    return (
        <Segment.Group>
            <Segment secondary compact textAlign='center' attached='top' inverted color='teal' style={{ border: 'none' }}>
                <Header>{isLoggedIn ? (!hasAppointment(id!) ? "Make an appointment" : "Your appointment") : "Login to make an appointment"}</Header>
            </Segment>
            {(isLoggedIn && hasAppointment(id!)) ?
                (<><Segment textAlign="center" size="large">
                    {format(new Date(getAppointment(id!)!.date), "MMM d, yyyy h:mm aa")}
                    </Segment>
                    <Segment textAlign="center" size="large" basic clearing attached='bottom'>
                        <Button style={{ width: '60%' }} color='red' loading={isSubmitting} content="Cancel Appointment" onClick={handleCancel} />
                    </Segment>
                </>) :
                (<><Segment padded clearing textAlign='center'>
                    <DatePicker placeholderText="Select time" timeCaption="time" dateFormat="MMMM d, yyyy" selected={selectedDate}
                        minDate={addDays(new Date(), 1)} maxDate={addDays(new Date(), 60)} disabled={!isLoggedIn || hasAppointment(id!)}
                        onChange={(date) => { setSelectedDate(date); setDateChanged(true) }} />
                </Segment>
                    <Segment padded clearing textAlign='center'>
                        <DatePicker selected={selectedTime} showTimeSelect showTimeSelectOnly timeIntervals={30} timeCaption="Time" dateFormat="h:mm aa"
                            excludeTimes={excludeTimes(selectedDate!)} onChange={(date) => { setSelectedTime(date); setTimeChanged(true); }}
                            maxTime={setHours(setMinutes(new Date(), 0), 19)} minTime={setHours(setMinutes(new Date(), 0), 9)}
                            disabled={!dateChanged} />
                    </Segment>
                    <Segment textAlign="center" size="large" basic clearing attached='bottom'>
                        <Button style={{ width: '60%' }} color='blue' disabled={!timeChanged} loading={isSubmitting}
                            onClick={handleCreate}>Book</Button>
                    </Segment></>)}
        </Segment.Group>
    );
}

export default observer(DoctorDetailedSidebar);