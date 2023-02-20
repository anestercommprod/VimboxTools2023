function ThrowAnErr(index)
{
    let errStr = `Error #${index} \n`;
    switch(index)
    {
            // Tech-Sup Tools
        case "101x0":
            return errStr + "One have to define theirs IDs first, or be prohibited.";
        break;
        case "102x0":
            return errStr + "You're not allowed to create lessons for admin accounts.";
        break;
        case "100x2a":
            return errStr + "Student ID is not defined.";
        break;
        case "100x2b":
            return errStr + "Teacher ID is not defined.";
        break;

            //Admin. Tools
        case "201x0":
            return errStr + " | No data been found for that certain range.<br>Try going through previous month"
        break;

        default:
            return "An unknown error occured.\nThis error has no index, contact @AN to investigate what causes this behaviour.";
        break;
    }
}