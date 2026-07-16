import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import useMissions from "../../hooks/useMissions";
import toast from "react-hot-toast";

import {
  getProfile,
  updateProfile,
  uploadAvatar,
} from "../../services/profileService";

function Profile() {

  const { user, updateUser } = useAuth();

  const { missions, loading } = useMissions();

  const [form, setForm] = useState({
    first_name: user?.full_name?.split(" ")[0] || "",
    last_name: user?.full_name?.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    phone: "",
    organization: "",
    bio: "",
  });

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {

    async function loadProfile() {

      try {

        const profile = await getProfile();

        setForm({
          first_name: profile.first_name,
          last_name: profile.last_name,
          email: profile.email,
          phone: profile.phone || "",
          organization: profile.organization || "",
          bio: profile.bio || "",
        });

        setAvatar(profile.profile_image);

        updateUser({
          ...user,
          full_name: `${profile.first_name} ${profile.last_name}`,
          email: profile.email,
          role: profile.role,
          profile_image: profile.profile_image,
        });

      } catch (error) {

        console.error(error);

        toast.error("Unable to load profile.");

      }

    }

    loadProfile();

  }, [user, updateUser]); 

  if (loading) {
    return <p>Loading...</p>;
  }

  const avgConfidence =
    missions.length === 0
      ? 0
      : Math.round(
          missions.reduce((sum, mission) => {

            let c = Number(mission.confidence) || 0;

            if (c <= 1) c *= 100;

            return sum + c;

          }, 0) / missions.length
        );
  function handleChange(e) {

    setForm({

      ...form,
      [e.target.name]: e.target.value,

    });

  }

  async function handleSave() {

    try {

      const updatedProfile = await updateProfile({

        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        organization: form.organization,
        bio: form.bio,

      });

      setForm({

        first_name: updatedProfile.first_name,
        last_name: updatedProfile.last_name,
        email: updatedProfile.email,
        phone: updatedProfile.phone || "",
        organization: updatedProfile.organization || "",
        bio: updatedProfile.bio || "",

      });

      updateUser({

        ...user,

        full_name:
          `${updatedProfile.first_name} ${updatedProfile.last_name}`,

        email: updatedProfile.email,

      });

      toast.success("Profile updated successfully.");

    }

    catch (error) {

      console.error(error);

      toast.error("Unable to update profile.");

    }

  }

  async function handleAvatarChange(e) {

    const file = e.target.files[0];

    if (!file) return;

    try {

      const result = await uploadAvatar(file);

      setAvatar(result.profile_image);
      updateUser({
      ...user,
      profile_image: result.profile_image,
    });
      toast.success("Profile picture updated.");

    }

    catch (error) {

      console.error(error);

      toast.error("Failed to upload image.");

    }

  }

  return (

    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            My Profile
          </h1>

          <p className="mt-2 text-secondary">
            Manage your SentinelAI account information.
          </p>

        </div>

        <div className="grid gap-8 xl:grid-cols-3">

          {/* Profile Card */}

          <div className="bg-surface border-app rounded-2xl border p-8 shadow-sm">

            <div className="flex flex-col items-center">

              <label className="cursor-pointer">

                {avatar ? (

                  <img
                    src={`http://127.0.0.1:8000${avatar}`}
                    alt="Profile"
                    className="h-28 w-28 rounded-full border-4 border-blue-900 object-cover"
                  />

                ) : (

                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-900 text-4xl font-bold text-white">

                    {user?.full_name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)}

                  </div>

                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />

              </label>

              <p className="mt-3 text-sm text-slate-500">
                Click photo to change
              </p>

              <h2 className="mt-5 text-2xl font-bold">

                {user?.full_name}

              </h2>

              <p className="mt-1 text-slate-500">

                {user?.email}

              </p>

              <span className="mt-5 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">

                {user?.role}

              </span>

            </div>

          </div>

          {/* Edit Form */}

          <div className="xl:col-span-2 bg-surface border-app rounded-2xl border p-8 shadow-sm">
                      <div className="grid gap-6 md:grid-cols-2">

              <Input
                label="First Name"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
              />

              <Input
                label="Last Name"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
              />

              <Input
                label="Email"
                name="email"
                value={form.email}
                readOnly
              />

              <Input
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />

              <Input
                label="Organization"
                name="organization"
                value={form.organization}
                onChange={handleChange}
              />

            </div>

            <div className="mt-6">

              <label className="mb-2 block font-medium">

                Bio

              </label>

              <textarea
                name="bio"
                rows={5}
                value={form.bio}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 p-3"
              />

            </div>

            <button
              onClick={handleSave}
              className="mt-8 rounded-xl bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800"
            >

              Save Changes

            </button>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid gap-6 md:grid-cols-3">

          <Stat
            title="Total Missions"
            value={missions.length}
          />

          <Stat
            title="Reports Generated"
            value={missions.length}
          />

          <Stat
            title="Average AI Confidence"
            value={`${avgConfidence}%`}
          />

        </div>

      </div>

    </DashboardLayout>

  );

}

function Input({

  label,

  ...props

}) {

  return (

    <div>

      <label className="mb-2 block font-medium">

        {label}

      </label>

      <input
        {...props}
        className="w-full rounded-xl border border-slate-300 p-3"
      />

    </div>

  );

}

function Stat({

  title,

  value,

}) {

  return (

    <div className="bg-surface border-app rounded-2xl border p-6 shadow-sm">

      <h3 className="text-3xl font-bold">

        {value}

      </h3>

      <p className="mt-2 text-slate-500">

        {title}

      </p>

    </div>

  );

}

export default Profile;