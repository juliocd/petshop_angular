import { isDevMode } from "@angular/core";
import { environment } from "src/environments/environment";

export default function getHost() {
    if(!environment.production) {
        return `${environment.host}:${environment.port}`;
    }

    return `${environment.host}:${environment.port}`;
}