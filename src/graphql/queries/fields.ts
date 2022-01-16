export const productFields = `
    id
    code
    full_name
    part_number
    brand
    type
    images {
        deleteUrl
        displayUrl
    }
    guarantee
    maker
    is_in_stock
    price
    discount
    description
    category_name
`;

export const categoryFields = `
    category_name
    title
    description_sections
    description_section_fields {
        fieldName
        sectionName
        enFieldName
        unit
    }
`;

export const magnitolFields = `
    id
    nominal_size
    removable_panel
    screen_type
    screen_technology
    touchscreen
    navigation
    remote_control
    rc_in_complect
    illumination_color
    supported_mobile
    sd_drivers
    bluetooth
    stereo_bluetooth
    AOA
    wi_fi
    USB
    radio_frequency
    saved_radio_stations
    rds
    audio_input_3_5
    audio_input_rca
    audio_output_rca
    digital_output
    video_output_rca
    video_input_rca
    channels_number
    power_for_channel
    equalizer
`;

export const audioSpeakerFields = `
    id
    max_power
    nominal_power
    frequency_range
    sensitivity
    resistance
    stripes_number
    nominal_size
    crossover_frequency
    external_crossover
    crossover_slope
    diffuser_shape
`;

export const sabwooferFields = `
    nominal_size
    built_in_amplifier
    corpus_shape
    corpus_type
    max_power
    nominal_power
    sensitivity
    resistance
    stripes_number
    frequency_range
    width
    height
    depth
`;

export const signalisationFields = `
    directionality
    alert_range
    manage_range
    zones_count
    control_key_count
    security_mode
    gps
    search_auto
    mobile_app
    display
    sms_vois_notifications
    turbo_timer
    autostart_engine
    remote_start_engine
    anti_robber
    temperature
    slave_module
    nominal_tension
    max_tension
    equipment
`;

export const dvrFields = `
    screen_type
    is_has_screen
    matrix_type
    screen_technology
    screen_size
    camera_count
    touchscreen
    sd_drives
    bluetooth
    wi_fi
    USB
    viewing_angle
    compression_format
    record_resolution
    frame_frequency
    gps
    microphone
    builtin_speaker
    auto_turn_on
    motion_sensor
    illumination_night
    width
    length
    thickness
    battery_type
    battery_life
    battery_capacity
    equipment
    recording_resolution
    body_material
`;

export const amplifierFields = `
    id
    channels_count
    power_per_channel_4om
    power_per_channel_2om
    u_l_frequency_range
    l_l_frequency_range
    harmonic_distortion
    linear_a_inputs
    a_outputs
    signal_to_noise_ratio
    width
    height
    depth
`;

export const newsFields = `
    id
    title
    description
    short_description
    image
    start_date
    end_date
`;

export const addressFields = `
    id
    postcode
    address
    isDefault
    city
`;

export const orderFields = `
    orderId
    userEmail
    status
    deliveryType
    paymentType
    address {
        address
        city
        postcode
    }
    deliveryCost
    items {
        productId
        count
    }
    subtotal
    total
    userDetails {
        firstName
        lastName
        phoneNumber
    }
    createdAt
    currentStep
    stepDate
    isMailing
    productItems {
        ${productFields}
        count
    }
`;

export const userFields = `
    id
    first_name
    last_name
    email
    phone_number
    avatar
    birthday
    wishlist {
        ${productFields}
    }
    addresses {
        ${addressFields}
    }
`;
