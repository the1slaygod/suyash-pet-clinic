CREATE TABLE public.appointment_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  parent_name text NOT NULL CHECK (char_length(parent_name) BETWEEN 1 AND 100),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 20),
  pet_name text NOT NULL CHECK (char_length(pet_name) BETWEEN 1 AND 60),
  pet_type text NOT NULL CHECK (char_length(pet_type) <= 30),
  service text NOT NULL CHECK (char_length(service) <= 80),
  preferred_date date,
  preferred_time text CHECK (char_length(preferred_time) <= 20),
  notes text CHECK (char_length(notes) <= 1000),
  status text NOT NULL DEFAULT 'enquiry_submitted'
);
GRANT INSERT ON public.appointment_enquiries TO anon, authenticated;
GRANT ALL ON public.appointment_enquiries TO service_role;
ALTER TABLE public.appointment_enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an enquiry" ON public.appointment_enquiries FOR INSERT TO anon, authenticated WITH CHECK (status = 'enquiry_submitted');