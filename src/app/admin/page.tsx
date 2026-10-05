import { TrendingUp, Users, Eye, CheckCircle, Plus } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export const revalidate = 0; // Disable cache to always fetch latest data

export default async function AdminDashboard() {
  // Fetch from Supabase
  const { data: inquiries, error: inquiriesError } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  const { count: inquiriesCount } = await supabase
    .from('inquiries')
    .select('*', { count: 'exact', head: true });

  const { count: projectsCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true });

  const { count: blogsCount } = await supabase
    .from('blogs')
    .select('*', { count: 'exact', head: true });

  const { count: servicesCount } = await supabase
    .from('services')
    .select('*', { count: 'exact', head: true });

  const recentInquiries = inquiries || [];
  const actualInquiriesCount = inquiriesCount || 0;
  
  // Fallbacks based on our static data if database is empty
  const actualProjectsCount = projectsCount && projectsCount > 0 ? projectsCount : 6; 
  const actualBlogsCount = blogsCount && blogsCount > 0 ? blogsCount : 3;
  const actualServicesCount = servicesCount && servicesCount > 0 ? servicesCount : 4;
  
  const stats = [
    { title: "Total Services", value: actualServicesCount.toString(), change: "Live", icon: Eye, color: "text-[#8a198c]", bg: "bg-[#8a198c]/10" },
    { title: "Published Blogs", value: actualBlogsCount.toString(), change: "Live", icon: Users, color: "text-pink-500", bg: "bg-pink-500/10" },
    { title: "New Inquiries", value: actualInquiriesCount.toString(), change: "Live", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Projects Completed", value: actualProjectsCount.toString(), change: "Live", icon: CheckCircle, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];


  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2">Welcome Back, Admin</h1>
        <p className="text-gray-500 font-medium">Here's what's happening with your website today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white border border-gray-100 shadow-sm shadow-gray-200/50 rounded-2xl p-6 relative overflow-hidden group hover:shadow-md hover:border-gray-200 transition-all">
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <span className="text-sm font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                  {stat.change}
                </span>
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Inquiries Table */}
        <div className="lg:col-span-2 bg-white border border-gray-100 shadow-sm shadow-gray-200/50 rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Contact Inquiries</h2>
            <button className="text-sm font-bold text-[#8a198c] hover:text-pink-600 transition-colors">View All</button>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-500 text-sm border-b border-gray-100">
                  <th className="pb-3 font-bold px-4">Contact Details</th>
                  <th className="pb-3 font-bold px-4">Project & Message</th>
                  <th className="pb-3 font-bold px-4">Date</th>
                  <th className="pb-3 font-bold px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors">
                    <td className="py-4 px-4 align-top">
                      <div>
                        <p className="font-bold text-gray-900">{inquiry.full_name}</p>
                        <p className="text-sm text-gray-500 mt-0.5">{inquiry.email_address}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top">
                      <div>
                        <p className="text-sm font-bold text-gray-800">{inquiry.project_type}</p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2 max-w-xs">{inquiry.message}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-500 text-sm font-medium align-top whitespace-nowrap">
                      {new Date(inquiry.created_at).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                    <td className="py-4 px-4 align-top">
                      <span className={`text-xs px-2.5 py-1.5 rounded-full font-bold border ${
                        inquiry.status === "New" ? "bg-blue-50 text-blue-600 border-blue-100" :
                        inquiry.status === "In Progress" ? "bg-yellow-50 text-yellow-600 border-yellow-100" :
                        "bg-green-50 text-green-600 border-green-100"
                      }`}>
                        {inquiry.status || "New"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Activity */}
        <div className="bg-white border border-gray-100 shadow-sm shadow-gray-200/50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            <Link href="/admin/projects" className="w-full py-3.5 px-4 bg-gradient-to-r from-[#8a198c] to-pink-600 hover:opacity-90 text-white rounded-xl text-sm font-bold transition-opacity shadow-md shadow-pink-500/20 text-left flex items-center justify-between group">
              <span className="flex items-center gap-2">
                <Plus size={16} />
                Add New Project
              </span>
            </Link>
            <Link href="/admin/blog" className="w-full py-3.5 px-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 rounded-xl text-sm font-bold transition-colors text-left flex items-center justify-between group">
              Write Blog Post
              <Plus size={16} className="text-gray-400 group-hover:text-gray-700" />
            </Link>
            <Link href="/admin/services" className="w-full py-3.5 px-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 rounded-xl text-sm font-bold transition-colors text-left flex items-center justify-between group">
              Update Services
              <Plus size={16} className="text-gray-400 group-hover:text-gray-700" />
            </Link>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-6">Recent Activity</h2>
          <div className="flex flex-col gap-5 relative before:absolute before:inset-y-0 before:left-2.5 before:w-px before:bg-gray-200">
            <div className="flex gap-4 relative">
              <div className="w-5 h-5 rounded-full bg-blue-50 border-2 border-blue-500 shrink-0 mt-0.5 relative z-10"></div>
              <div>
                <p className="text-sm font-bold text-gray-800">New inquiry from Rahul</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">2 hours ago</p>
              </div>
            </div>
            <div className="flex gap-4 relative">
              <div className="w-5 h-5 rounded-full bg-pink-50 border-2 border-pink-500 shrink-0 mt-0.5 relative z-10"></div>
              <div>
                <p className="text-sm font-bold text-gray-800">System backup completed</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">5 hours ago</p>
              </div>
            </div>
            <div className="flex gap-4 relative">
              <div className="w-5 h-5 rounded-full bg-green-50 border-2 border-green-500 shrink-0 mt-0.5 relative z-10"></div>
              <div>
                <p className="text-sm font-bold text-gray-800">Project "AI Chatbot" published</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">Yesterday</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
