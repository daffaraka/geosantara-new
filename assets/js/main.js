/**
 * Geosantara Frontend Interactions
 * Handles AOS initialization and other JS logic
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi AOS dengan pengaturan lambat (smooth) untuk orang tua
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000, // 1 detik (lambat dan halus)
            easing: 'ease-out-cubic', // kurva perlambatan yang natural
            once: true, // hanya dianimasikan sekali saat di-scroll
            offset: 50, // trigger lebih cepat sedikit
        });
    }

    // Dynamic Blog Dropdown Loader
    const desktopBlogDropdown = document.getElementById('desktop-blog-dropdown');
    const mobileBlogDropdown = document.getElementById('mobile-blog-dropdown');

    if (desktopBlogDropdown || mobileBlogDropdown) {
        if (typeof categoryData !== 'undefined') {
            const categories = categoryData;
                let desktopHTML = '';
                let mobileHTML = '';
                
                categories.forEach(category => {
                    // Create Desktop link
                    desktopHTML += `<a href="#" class="block px-4 py-3 text-sm font-medium text-slate-600 hover:bg-geoBlue/5 hover:text-geoRed transition-colors">${category.category_title}</a>`;
                    
                    // Create Mobile link
                    mobileHTML += `<a href="#" class="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-geoRed hover:bg-slate-50">${category.category_title}</a>`;
                });

                if (desktopBlogDropdown) desktopBlogDropdown.innerHTML = desktopHTML;
                if (mobileBlogDropdown) mobileBlogDropdown.innerHTML = mobileHTML;
        } else {
            console.error('categoryData is not defined. Ensure categoryData.js is loaded.');
            const errorMsg = '<p class="px-4 py-3 text-sm text-slate-500">Gagal memuat kategori.</p>';
            if (desktopBlogDropdown) desktopBlogDropdown.innerHTML = errorMsg;
            if (mobileBlogDropdown) mobileBlogDropdown.innerHTML = errorMsg;
        }
    }

    // Dynamic Projects Loader
    const projectsContainer = document.getElementById('projects-container');
    const projectsLoading = document.getElementById('projects-loading');
    const projectsError = document.getElementById('projects-error');

    if (projectsContainer) {
        if (typeof categoryData !== 'undefined' && typeof projectsData !== 'undefined') {
            const categories = categoryData;
            const projectData = projectsData;
            
            // Find projects table data
            let projects = [];
            const tableData = projectData.find(item => item.type === "table" && item.name === "projects");
            if (tableData && tableData.data) {
                projects = tableData.data;
            }

            // Map categories to dictionary for fast lookup
            const catMap = {};
            categories.forEach(c => {
                catMap[c.category_id] = c;
            });

            if (projects.length === 0) {
                if (projectsError) {
                    projectsError.classList.remove('hidden');
                    projectsError.innerText = "Belum ada proyek yang tersedia.";
                }
            } else {
                let html = '';
                projects.forEach((proj, idx) => {
                    const category = catMap[proj.project_category] || { category_title: "Umum", category_color: "#1E3A8A" };
                    // Default image if project_img is missing or empty
                    const imgUrl = proj.project_img ? 'assets/img/projects/' + proj.project_img : 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=800&auto=format&fit=crop';
                    
                    html += `
                    <div class="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group" data-aos="fade-up" data-aos-delay="${(idx % 3) * 100}">
                        <div class="relative h-56 overflow-hidden bg-slate-100">
                            <img src="${imgUrl}" alt="${proj.project_title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=800&auto=format&fit=crop'">
                            <div class="absolute top-4 left-4">
                                <span class="px-3 py-1 text-xs font-bold text-white rounded-full shadow-md" style="background-color: ${category.category_color}">${category.category_title}</span>
                            </div>
                        </div>
                        <div class="p-6 flex-grow flex flex-col">
                            <h3 class="text-xl font-bold text-geoDark mb-3 line-clamp-2 group-hover:text-geoBlue transition-colors">${proj.project_title}</h3>
                            ${proj.project_client ? `<p class="text-sm font-semibold text-slate-600 mb-2 flex items-start"><svg class="shrink-0 w-4 h-4 mr-2 text-geoRed mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v1H9V7zm5 0h1v1h-1V7zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1zm-3 4H8m7 0h-3"></path></svg><span class="line-clamp-1">${proj.project_client}</span></p>` : ''}
                            ${proj.project_location ? `<p class="text-sm text-slate-500 mb-4 flex items-start"><svg class="shrink-0 w-4 h-4 mr-2 text-slate-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg><span class="line-clamp-2">${proj.project_location}</span></p>` : ''}
                            
                            <div class="mt-auto pt-5 border-t border-slate-100 flex items-center justify-start">
                                <a href="#" class="inline-flex items-center bg-geoRed hover:bg-geoRed-dark text-white text-sm font-bold py-2.5 px-5 rounded transition-colors group/btn">
                                    Pelajari
                                    <svg class="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>`;
                });
                
                projectsContainer.innerHTML = html;
                projectsContainer.classList.remove('hidden');
                
                // Re-init AOS for dynamically loaded elements
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            }
        } else {
            console.error('Data not loaded. Ensure categoryData.js and projectsData.js are loaded.');
            if (projectsError) projectsError.classList.remove('hidden');
        }
        
        if (projectsLoading) projectsLoading.classList.add('hidden');
    }
});
