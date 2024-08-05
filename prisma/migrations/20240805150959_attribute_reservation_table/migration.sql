-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Country" (
    "country_id" BIGSERIAL NOT NULL,
    "country_name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("country_id")
);

-- CreateTable
CREATE TABLE "State" (
    "state_id" BIGSERIAL NOT NULL,
    "state_name" TEXT NOT NULL,
    "state_country_id" BIGINT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("state_id")
);

-- CreateTable
CREATE TABLE "City" (
    "city_id" BIGSERIAL NOT NULL,
    "city_name" TEXT NOT NULL,
    "city_state_id" BIGINT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "Sex" (
    "sex_id" BIGSERIAL NOT NULL,
    "sex_name" TEXT NOT NULL,

    CONSTRAINT "Sex_pkey" PRIMARY KEY ("sex_id")
);

-- CreateTable
CREATE TABLE "Pathology" (
    "pathology_id" BIGSERIAL NOT NULL,
    "pathology_name" TEXT NOT NULL,

    CONSTRAINT "Pathology_pkey" PRIMARY KEY ("pathology_id")
);

-- CreateTable
CREATE TABLE "Role" (
    "role_id" BIGSERIAL NOT NULL,
    "role_name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "CivilStatus" (
    "civil_status_id" BIGSERIAL NOT NULL,
    "civil_status_name" TEXT NOT NULL,

    CONSTRAINT "CivilStatus_pkey" PRIMARY KEY ("civil_status_id")
);

-- CreateTable
CREATE TABLE "Church" (
    "church_id" BIGSERIAL NOT NULL,
    "church_name" TEXT NOT NULL,
    "church_state_id" BIGINT NOT NULL,
    "church_postal_code" INTEGER NOT NULL,
    "church_address" TEXT NOT NULL,
    "church_pastor_name" TEXT NOT NULL,
    "church_pastor_email" TEXT NOT NULL,
    "church_pastor_phone" INTEGER NOT NULL,
    "church_pastor_cellphone" INTEGER NOT NULL,

    CONSTRAINT "Church_pkey" PRIMARY KEY ("church_id")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "googleId" TEXT,
    "user_name" TEXT NOT NULL,
    "user_surname" TEXT NOT NULL,
    "user_date_of_birthday" TIMESTAMP(3) NOT NULL,
    "user_civil_status_id" BIGINT NOT NULL,
    "user_sex_id" BIGINT NOT NULL,
    "user_church_id" BIGINT NOT NULL,
    "user_residence_state_id" BIGINT NOT NULL,
    "user_role_id" BIGINT NOT NULL,
    "user_password" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserPathology" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "user_pathology_id" BIGINT NOT NULL,

    CONSTRAINT "UserPathology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Place" (
    "place_id" BIGSERIAL NOT NULL,
    "place_name" TEXT NOT NULL,
    "place_address" TEXT NOT NULL,
    "place_state_id" BIGINT NOT NULL,
    "place_capacity" INTEGER NOT NULL,
    "place_phone_contact" INTEGER NOT NULL,
    "place_manager" TEXT NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("place_id")
);

-- CreateTable
CREATE TABLE "AccomodationType" (
    "accomodaton_type_id" BIGSERIAL NOT NULL,
    "accomodation_name" TEXT NOT NULL,

    CONSTRAINT "AccomodationType_pkey" PRIMARY KEY ("accomodaton_type_id")
);

-- CreateTable
CREATE TABLE "Accomodation" (
    "accomodation_id" BIGSERIAL NOT NULL,
    "accomodation_name" TEXT NOT NULL,
    "accomodation_type_id" BIGINT NOT NULL,
    "accomodation_place_id" BIGINT NOT NULL,
    "accomodation_capacity" BIGINT NOT NULL,
    "accomodation_disponibility" TEXT NOT NULL DEFAULT 'free',

    CONSTRAINT "Accomodation_pkey" PRIMARY KEY ("accomodation_id")
);

-- CreateTable
CREATE TABLE "PaymentType" (
    "payment_type_id" BIGSERIAL NOT NULL,
    "payment_type_name" TEXT NOT NULL,

    CONSTRAINT "PaymentType_pkey" PRIMARY KEY ("payment_type_id")
);

-- CreateTable
CREATE TABLE "PaymentStatus" (
    "payment_status_id" BIGSERIAL NOT NULL,
    "payment_status_name" TEXT NOT NULL,

    CONSTRAINT "PaymentStatus_pkey" PRIMARY KEY ("payment_status_id")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "payment_method_id" BIGSERIAL NOT NULL,
    "payment_method_name" TEXT NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("payment_method_id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "payment_id" BIGSERIAL NOT NULL,
    "payment_method_id" BIGINT NOT NULL,
    "payment_status_id" BIGINT NOT NULL,
    "payment_type_id" BIGINT NOT NULL,
    "payment_description" TEXT NOT NULL,
    "payment_amount" INTEGER NOT NULL,
    "payment_creation_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "organization_id" BIGSERIAL NOT NULL,
    "organization_name" TEXT NOT NULL,
    "organization_country_id" BIGINT NOT NULL,
    "organization_manager" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("organization_id")
);

-- CreateTable
CREATE TABLE "Period" (
    "period_id" BIGSERIAL NOT NULL,
    "period_title" TEXT NOT NULL,
    "period_managers" TEXT NOT NULL,

    CONSTRAINT "Period_pkey" PRIMARY KEY ("period_id")
);

-- CreateTable
CREATE TABLE "OrganizationDevelopPeriod" (
    "organization_develop_period_id" BIGSERIAL NOT NULL,
    "organization_id" BIGINT NOT NULL,
    "period_id" BIGINT NOT NULL,

    CONSTRAINT "OrganizationDevelopPeriod_pkey" PRIMARY KEY ("organization_develop_period_id")
);

-- CreateTable
CREATE TABLE "Event" (
    "event_id" BIGSERIAL NOT NULL,
    "event_name" TEXT NOT NULL,
    "event_period_id" BIGINT NOT NULL,
    "event_place_id" BIGINT NOT NULL,
    "event_budget" BIGINT NOT NULL,
    "event_date_start" TIMESTAMP(3) NOT NULL,
    "event_date_end" TIMESTAMP(3) NOT NULL,
    "event_organization_id" BIGINT NOT NULL,
    "event_costs" JSONB[],

    CONSTRAINT "Event_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "EventOrganizations" (
    "evebt_organization_id" BIGSERIAL NOT NULL,
    "event_id" BIGINT NOT NULL,
    "organization_id" BIGINT NOT NULL,

    CONSTRAINT "EventOrganizations_pkey" PRIMARY KEY ("event_id","organization_id")
);

-- CreateTable
CREATE TABLE "ReservationStatus" (
    "reservation_status_id" BIGSERIAL NOT NULL,
    "reservation_status_name" TEXT NOT NULL,

    CONSTRAINT "ReservationStatus_pkey" PRIMARY KEY ("reservation_status_id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "reservation_id" BIGSERIAL NOT NULL,
    "reservation_userId" BIGINT NOT NULL,
    "reservation_event_id" BIGINT NOT NULL,
    "reservation_date_time_entry" TIMESTAMP(3) NOT NULL,
    "reservation_date_time_departure" TIMESTAMP(3) NOT NULL,
    "reservation_accomodation_type_id" BIGINT NOT NULL,
    "reservation_status_id" BIGINT NOT NULL,
    "reservation_expiration_day" TIMESTAMP(3) NOT NULL,
    "reservation_last_payment" TIMESTAMP(3) NOT NULL,
    "reservation_deposit_amount" INTEGER NOT NULL,
    "reservation_amount" INTEGER NOT NULL,
    "accomodationAccomodation_id" BIGINT,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("reservation_id")
);

-- CreateTable
CREATE TABLE "AdditionalAttribute" (
    "attribute_id" BIGSERIAL NOT NULL,
    "attribute_reservation_id" BIGINT NOT NULL,
    "attribute_key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "AdditionalAttribute_pkey" PRIMARY KEY ("attribute_id")
);

-- CreateTable
CREATE TABLE "ReservationGeneratePayment" (
    "reservation_generate_payment_id" BIGSERIAL NOT NULL,
    "payment_user_id" BIGINT NOT NULL,
    "payment_id" BIGINT NOT NULL,
    "reservation_id" BIGINT NOT NULL,

    CONSTRAINT "ReservationGeneratePayment_pkey" PRIMARY KEY ("reservation_generate_payment_id")
);

-- CreateTable
CREATE TABLE "Area" (
    "area_id" BIGSERIAL NOT NULL,
    "area_description" TEXT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("area_id")
);

-- CreateTable
CREATE TABLE "System" (
    "system_id" BIGSERIAL NOT NULL,
    "system_area_id" BIGINT NOT NULL,
    "system_status_id" BIGINT NOT NULL,
    "system_last_change" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "System_pkey" PRIMARY KEY ("system_id")
);

-- CreateTable
CREATE TABLE "Log" (
    "log_id" BIGSERIAL NOT NULL,
    "log_user_identification" BIGINT NOT NULL,
    "log_area_id" BIGINT NOT NULL,
    "log_description" TEXT NOT NULL,
    "log_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "LogRegistrySystemArea" (
    "log_registry_systen_area_id" BIGSERIAL NOT NULL,
    "log_id" BIGINT NOT NULL,
    "area_id" BIGINT NOT NULL,

    CONSTRAINT "LogRegistrySystemArea_pkey" PRIMARY KEY ("log_registry_systen_area_id")
);

-- CreateTable
CREATE TABLE "RolesModifySistemAreas" (
    "role_id" BIGINT NOT NULL,
    "area_list_id" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Country_country_id_key" ON "Country"("country_id");

-- CreateIndex
CREATE UNIQUE INDEX "State_state_id_key" ON "State"("state_id");

-- CreateIndex
CREATE UNIQUE INDEX "City_city_id_key" ON "City"("city_id");

-- CreateIndex
CREATE UNIQUE INDEX "Sex_sex_id_key" ON "Sex"("sex_id");

-- CreateIndex
CREATE UNIQUE INDEX "Pathology_pathology_id_key" ON "Pathology"("pathology_id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_id_key" ON "Role"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "CivilStatus_civil_status_id_key" ON "CivilStatus"("civil_status_id");

-- CreateIndex
CREATE UNIQUE INDEX "Church_church_id_key" ON "Church"("church_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPathology_id_key" ON "UserPathology"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationDevelopPeriod_organization_id_key" ON "OrganizationDevelopPeriod"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "ReservationStatus_reservation_status_id_key" ON "ReservationStatus"("reservation_status_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_reservation_id_key" ON "Reservation"("reservation_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_reservation_userId_key" ON "Reservation"("reservation_userId");

-- CreateIndex
CREATE INDEX "AdditionalAttribute_attribute_reservation_id_idx" ON "AdditionalAttribute"("attribute_reservation_id");

-- CreateIndex
CREATE UNIQUE INDEX "System_system_id_key" ON "System"("system_id");

-- CreateIndex
CREATE UNIQUE INDEX "Log_log_id_key" ON "Log"("log_id");

-- CreateIndex
CREATE UNIQUE INDEX "RolesModifySistemAreas_role_id_key" ON "RolesModifySistemAreas"("role_id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_state_country_id_fkey" FOREIGN KEY ("state_country_id") REFERENCES "Country"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_city_state_id_fkey" FOREIGN KEY ("city_state_id") REFERENCES "State"("state_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Church" ADD CONSTRAINT "Church_church_state_id_fkey" FOREIGN KEY ("church_state_id") REFERENCES "State"("state_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_residence_state_id_fkey" FOREIGN KEY ("user_residence_state_id") REFERENCES "State"("state_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_church_id_fkey" FOREIGN KEY ("user_church_id") REFERENCES "Church"("church_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_sex_id_fkey" FOREIGN KEY ("user_sex_id") REFERENCES "Sex"("sex_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "Role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_civil_status_id_fkey" FOREIGN KEY ("user_civil_status_id") REFERENCES "CivilStatus"("civil_status_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPathology" ADD CONSTRAINT "UserPathology_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPathology" ADD CONSTRAINT "UserPathology_user_pathology_id_fkey" FOREIGN KEY ("user_pathology_id") REFERENCES "Pathology"("pathology_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_place_state_id_fkey" FOREIGN KEY ("place_state_id") REFERENCES "State"("state_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accomodation" ADD CONSTRAINT "Accomodation_accomodation_type_id_fkey" FOREIGN KEY ("accomodation_type_id") REFERENCES "AccomodationType"("accomodaton_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accomodation" ADD CONSTRAINT "Accomodation_accomodation_place_id_fkey" FOREIGN KEY ("accomodation_place_id") REFERENCES "Place"("place_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_payment_type_id_fkey" FOREIGN KEY ("payment_type_id") REFERENCES "PaymentType"("payment_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_payment_status_id_fkey" FOREIGN KEY ("payment_status_id") REFERENCES "PaymentStatus"("payment_status_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "PaymentMethod"("payment_method_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_organization_country_id_fkey" FOREIGN KEY ("organization_country_id") REFERENCES "Country"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationDevelopPeriod" ADD CONSTRAINT "OrganizationDevelopPeriod_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationDevelopPeriod" ADD CONSTRAINT "OrganizationDevelopPeriod_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "Period"("period_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_event_period_id_fkey" FOREIGN KEY ("event_period_id") REFERENCES "Period"("period_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_event_place_id_fkey" FOREIGN KEY ("event_place_id") REFERENCES "Place"("place_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventOrganizations" ADD CONSTRAINT "EventOrganizations_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventOrganizations" ADD CONSTRAINT "EventOrganizations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_reservation_event_id_fkey" FOREIGN KEY ("reservation_event_id") REFERENCES "Event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_reservation_accomodation_type_id_fkey" FOREIGN KEY ("reservation_accomodation_type_id") REFERENCES "AccomodationType"("accomodaton_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_reservation_status_id_fkey" FOREIGN KEY ("reservation_status_id") REFERENCES "ReservationStatus"("reservation_status_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_reservation_userId_fkey" FOREIGN KEY ("reservation_userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_accomodationAccomodation_id_fkey" FOREIGN KEY ("accomodationAccomodation_id") REFERENCES "Accomodation"("accomodation_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdditionalAttribute" ADD CONSTRAINT "AdditionalAttribute_attribute_reservation_id_fkey" FOREIGN KEY ("attribute_reservation_id") REFERENCES "Reservation"("reservation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationGeneratePayment" ADD CONSTRAINT "ReservationGeneratePayment_payment_user_id_fkey" FOREIGN KEY ("payment_user_id") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationGeneratePayment" ADD CONSTRAINT "ReservationGeneratePayment_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("payment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationGeneratePayment" ADD CONSTRAINT "ReservationGeneratePayment_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "Reservation"("reservation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_log_user_identification_fkey" FOREIGN KEY ("log_user_identification") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_log_area_id_fkey" FOREIGN KEY ("log_area_id") REFERENCES "Area"("area_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogRegistrySystemArea" ADD CONSTRAINT "LogRegistrySystemArea_log_id_fkey" FOREIGN KEY ("log_id") REFERENCES "Log"("log_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogRegistrySystemArea" ADD CONSTRAINT "LogRegistrySystemArea_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "Area"("area_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesModifySistemAreas" ADD CONSTRAINT "RolesModifySistemAreas_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;
