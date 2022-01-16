import { Category, CategoryFields, GeneralProduct, Magnitola, Promotion } from './entities';
import { MagnitolDetails } from './queries/user.query';
import { User } from './entities';

export type SimpleGQLResponse<Key extends string, T> = {
    [X in Key]: T;
};

export class FilterObject {
    field_name: string;
    view_field_name?: string;
    values: string[];
    category: string;
    type: string;
}

export class RequestToCallbackResponse {
    isSuccess: boolean;
}

export class CategoryNames {
    category_name: string;
    title: string;
}

export interface AuthResponse {
    token: string;
}

export interface OrderDetailsResponse {
    orderId: string;
    userEmail: string;
}

export interface ProductList {
    readonly count: string;
    readonly products: Array<GeneralProduct>;
}

export interface LoadProductsPayload {
    limit: number;
    startId?: number;
}

export type ProductCharacteristicInfo =
    | MagnitolDetails
    | AudioSpeaker
    | AmpliferDetails
    | DVRlDetails
    | SignalisationDetails
    | SubwooferDetails;

export interface MagnitolDetails {
    nominal_size: string;
    removable_panel?: boolean;
    screen_type: string;
    screen_technology: string;
    touchscreen?: boolean;
    navigation?: boolean;
    remote_control?: boolean;
    rc_in_complect?: boolean;
    illumination_color: string;
    support_formats: string;
    sd_drivers: string;
    bluetooth?: boolean;
    stereo_bluetooth?: boolean;
    AOA?: boolean;
    wi_fi?: boolean;
    USB?: boolean;
    supported_mobile?: boolean;
    radio_frequency: string;
    saved_radio_stations?: string;
    rds?: boolean;
    audio_input_3_5?: boolean;
    audio_input_rca?: boolean;
    audio_output_rca?: boolean;
    digital_output?: boolean;
    video_output_rca?: boolean;
    video_input_rca?: boolean;
    channels_number: string;
    power_for_channel: string;
    equalizer: number;
}

export interface AudioSpeaker {
    max_power: number;
    nominal_power: number;
    frequency_range: string;
    sensitivity: number;
    resistance: number;
    stripes_number: number;
    nominal_size: number;
    crossover_frequency?: string;
    external_crossover?: string;
    crossover_slope?: string;
    diffuser_shape?: string;
}

export interface AmpliferDetails {
    channels_count: number;
    power_per_channel_4om: number;
    power_per_channel_2om: number;
    u_l_frequency_range: number;
    l_l_frequency_range: number;
    harmonic_distortion: number;
    linear_a_inputs?: number;
    a_outputs?: number;
    signal_to_noise_ratio?: number;
    width?: number;
    height?: number;
    depth?: number;
}

export interface DVRlDetails {
    screen_type?: string;
    is_has_screen: boolean;
    matrix_type: string;
    screen_technology?: string;
    screen_size?: number;
    camera_count?: number;
    touchscreen?: boolean;
    sd_drives: string;
    bluetooth: boolean;
    wi_fi: boolean;
    USB: boolean;
    viewing_angle: number;
    compression_format: string;
    record_resolution: string;
    frame_frequency: number;
    gps: boolean;
    microphone: boolean;
    builtin_speaker: boolean;
    auto_turn_on: boolean;
    motion_sensor: boolean;
    illumination_night: boolean;
    width?: number;
    length?: number;
    thickness?: number;
    battery_type: string;
    battery_life: number;
    battery_capacity: number;
    equipment?: string;
    recording_resolution: string;
    body_material?: string;
}

export interface SignalisationDetails {
    directionality: string;
    alert_range: number;
    manage_range: number;
    zones_count: number;
    control_key_count?: number;
    security_mode?: boolean;
    gps: boolean;
    search_auto?: boolean;
    mobile_app?: boolean;
    display: boolean;
    sms_vois_notifications?: boolean;
    turbo_timer?: boolean;
    autostart_engine?: boolean;
    remote_start_engine?: boolean;
    anti_robber?: boolean;
    temperature?: string;
    slave_module?: boolean;
    nominal_tension?: number;
    max_tension?: number;
    equipment?: string;
}

export interface SubwooferDetails {
    nominal_size: string;
    built_in_amplifier: boolean;
    corpus_shape?: string;
    corpus_type?: string;
    max_power: number;
    nominal_power: number;
    sensitivity: number;
    resistance: number;
    stripes_number: number;
    frequency_range: string;
    width?: number;
    height?: number;
    depth?: number;
}

export interface RequestToCallbackPayload {
    name: string;
    email: string;
    message: string;
    phoneNumber?: string;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: string;
    avatar?: string;
    birthday?: string;
    addresses?: AddressInfo[];
    wishlist?: GeneralProduct[];
}
