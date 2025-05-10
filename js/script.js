// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 移动端导航菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // 切换汉堡菜单的动画
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // 打字机效果
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        const fullText = "欢迎来到我们的迷你游戏合集。这里集合了由我们团队开发的各种有趣小游戏，带给您简单而愉快的游戏体验。";
        let currentIndex = 0;
        const typingSpeed = 100; // 打字速度 (ms)
        const pauseTime = 2000; // 完成后暂停时间 (ms)
        
        function typeEffect() {
            if (!typewriterElement) return;
            
            // 打字完成后暂停，然后重新开始
            if (currentIndex === fullText.length) {
                setTimeout(() => {
                    currentIndex = 0;
                    typewriterElement.textContent = '';
                    typeEffect();
                }, pauseTime);
                return;
            }
            
            // 更新显示文本
            currentIndex++;
            typewriterElement.textContent = fullText.substring(0, currentIndex);
            
            // 设置下一次执行
            setTimeout(typeEffect, typingSpeed);
        }
        
        // 开始打字效果
        typeEffect();
    }
    
    // 添加平滑滚动到锚点链接
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // 检查目标元素是否存在
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // 计算滚动位置（减去导航栏高度）
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // 如果在移动设备上，点击后关闭菜单
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                // 重置汉堡菜单图标
                const spans = menuToggle.querySelectorAll('span');
                if (spans) {
                    spans.forEach(span => span.classList.remove('active'));
                }
            }
        });
    });
    
    // 页面滚动动画效果
    const fadeInElements = document.querySelectorAll('.fade-in');
    const slideInElements = document.querySelectorAll('.slide-in');
    
    // 检测元素是否进入视口的函数
    const isInViewport = function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    };
    
    // 滚动处理函数
    const handleScroll = function() {
        // 处理淡入元素
        fadeInElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });
        
        // 处理滑入元素
        slideInElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });
    };
    
    // 初始检查并绑定滚动事件
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    // 团队展示区的响应式调整
    function adjustTeamLayout() {
        const teamContainer = document.querySelector('.team-circle-container');
        if (!teamContainer) return;
        
        const teamMembers = teamContainer.querySelectorAll('.team-member');
        const teamLogo = teamContainer.querySelector('.team-logo');
        const teamRing = teamContainer.querySelector('.team-ring');
        
        // 如果是移动设备视图
        if (window.innerWidth <= 768) {
            // 重置定位样式
            teamMembers.forEach(member => {
                member.style.top = 'auto';
                member.style.left = 'auto';
                member.style.right = 'auto';
                member.style.transform = 'none';
            });
            
            if (teamLogo) {
                teamLogo.style.position = 'static';
                teamLogo.style.transform = 'none';
            }
            
            if (teamRing) {
                teamRing.style.display = 'none';
            }
        } else {
            // 恢复原始定位（通过CSS类实现）
            if (teamLogo) {
                teamLogo.style.position = 'absolute';
                teamLogo.style.transform = 'translate(-50%, -50%)';
            }
            
            if (teamRing) {
                teamRing.style.display = 'block';
            }
            
            // 手动设置成员位置以确保正确显示
            if (teamMembers.length >= 3) {
                // 第一个成员 - 左侧
                teamMembers[0].style.top = '50%';
                teamMembers[0].style.left = '0';
                teamMembers[0].style.right = 'auto';
                teamMembers[0].style.transform = 'translateY(-50%)';
                
                // 第二个成员 - 上部
                teamMembers[1].style.top = '0%';
                teamMembers[1].style.left = '50%';
                teamMembers[1].style.right = 'auto';
                teamMembers[1].style.transform = 'translateX(-50%)';
                
                // 第三个成员 - 右侧
                teamMembers[2].style.top = '50%';
                teamMembers[2].style.left = 'auto';
                teamMembers[2].style.right = '0';
                teamMembers[2].style.transform = 'translateY(-50%)';
            }
        }
    }
    
    // 初始调整和窗口大小改变时调整
    adjustTeamLayout();
    window.addEventListener('resize', adjustTeamLayout);
}); 